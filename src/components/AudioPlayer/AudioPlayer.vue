<script setup lang="ts">
import { ref, onMounted, watchEffect, watch } from 'vue'
import { useAudioContext } from '../../composables/useAudioContext'
import { Track } from '../../tracks'

import PlaybackControls from './PlaybackControls.vue'
import ProgressBar from './ProgressBar.vue'
import VolumeControl from './VolumeControl.vue'
import CurrentTrackInfo from '../CurrentTrackInfo.vue'

const props = defineProps<{
  track: Track | null
}>()

const emit = defineEmits<{
  (e: 'trackEnded'): void
}>()

const { audioContext, initAudioContext } = useAudioContext()

const audioSource = ref<AudioBufferSourceNode | null>(null)
const audioBuffer = ref<AudioBuffer | null>(null)
const gainNode = ref<GainNode | null>(null)

const duration = ref<number>(0)
const isPlaying = ref<boolean>(false)
const startTime = ref<number>(0)
const currentTime = ref<number>(0)
const pausedAt = ref<number>(0)
const offset = ref<number>(0)
const volume = ref<number>(1)

const resetState = () => {
  pausedAt.value = 0
  startTime.value = 0
  offset.value = 0
  currentTime.value = 0
}

const loadTrack = async (track: Track) => {
  if (!audioContext.value) return

  try {
    const response = await fetch(track.audioSrc)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const decodedBuffer = await audioContext.value.decodeAudioData(arrayBuffer)

    audioBuffer.value = decodedBuffer
    currentTime.value = 0
    duration.value = decodedBuffer.duration

    if (isPlaying.value) {
      await play()
    }
  } catch (error) {
    console.error('Error loading audio:', error)
  }
}

const play = async (startOffset: number = offset.value): Promise<void> => {
  if (!audioContext.value || !audioBuffer.value) return

  if (audioSource.value) {
    audioSource.value.stop()
    audioSource.value.disconnect()
  }

  audioSource.value = audioContext.value.createBufferSource()
  audioSource.value.buffer = audioBuffer.value

  if (!gainNode.value) {
    gainNode.value = audioContext.value.createGain()
    gainNode.value.connect(audioContext.value.destination)
  }

  audioSource.value.connect(gainNode.value)

  audioSource.value.start(0, startOffset)
  startTime.value = audioContext.value.currentTime
  offset.value = startOffset
  isPlaying.value = true
  updateCurrentTime()

  audioSource.value.onended = () => {
    if (currentTime.value >= duration.value - 0.1) {
      isPlaying.value = false
      resetState()
      emit('trackEnded')
    }
  }
}

const pause = (): void => {
  if (!audioContext.value || !audioSource.value) return

  const currentTime = audioContext.value.currentTime
  offset.value = currentTime - startTime.value + offset.value
  audioSource.value.stop()
  audioSource.value.disconnect()
  isPlaying.value = false
}

const togglePlay = (): void => {
  isPlaying.value ? pause() : play()
}

const stop = (): void => {
  if (audioSource.value) {
    audioSource.value.stop()
    audioSource.value.disconnect()
  }
  isPlaying.value = false

  resetState()
}

const updateCurrentTime = () => {
  if (isPlaying.value && audioContext.value) {
    currentTime.value =
      offset.value + (audioContext.value.currentTime - startTime.value)
    requestAnimationFrame(updateCurrentTime)
  }
}

const seek = (time: number) => {
  if (!audioContext.value || !audioBuffer.value) return

  const wasPlaying = isPlaying.value

  if (isPlaying.value) {
    pause()
  }

  offset.value = time
  currentTime.value = time

  if (wasPlaying) {
    play(time)
  }
}

const handleVolumeChange = (newVolume: number) => {
  volume.value = newVolume
  if (gainNode.value) {
    gainNode.value.gain.setValueAtTime(
      newVolume,
      audioContext.value!.currentTime
    )
  }
}

onMounted(async () => {
  initAudioContext()
  if (props.track) {
    await loadTrack(props.track)
  }
})

watch(
  () => props.track,
  async (newTrack) => {
    if (newTrack) {
      if (isPlaying.value) {
        pause()
      }
      resetState()
      await loadTrack(newTrack)
      play()
    }
  },
  { immediate: true }
)

watchEffect(() => {
  if (audioBuffer.value) {
    duration.value = audioBuffer.value.duration
  }
})
</script>

<template>
  <div v-if="track" :class="$style.audioPlayer">
    <div :class="$style.controlsAndThumbnail">
      <PlaybackControls
        :isPlaying="isPlaying"
        @togglePlay="togglePlay"
        @stop="stop"
      />
      <img :src="track.img" :class="$style.thumbnail" alt="Track thumbnail" />
    </div>
    <CurrentTrackInfo :track="track" :class="$style.trackInfo" />
    <ProgressBar
      :currentTime="currentTime"
      :duration="duration"
      @seek="seek"
      :class="$style.progressBar"
    />
    <VolumeControl
      :initialVolume="volume"
      @volumeChange="handleVolumeChange"
      :class="$style.volumeControl"
    />
  </div>
</template>

<style lang="scss" module>
.audioPlayer {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controlsAndThumbnail {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: 1rem;
}

.thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-left: 0.5rem;
}

.trackInfo {
  flex: 0 1 auto;
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progressBar {
  flex: 3;
  margin-right: 1rem;
}

.volumeControl {
  flex: 0 0 auto;
}

@media (max-width: 768px) {
  .audioPlayer {
    flex-wrap: wrap;
  }

  .progressBar {
    flex: 1 0 100%;
    order: 4;
    margin-top: 1rem;
  }

  .volumeControl {
    order: 3;
  }
}
</style>
