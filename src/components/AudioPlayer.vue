<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudioContext } from '../composables/useAudioContext'
import { tracks, Track } from '../tracks'

const { audioContext, initAudioContext } = useAudioContext()

const audioSource = ref<AudioBufferSourceNode | null>(null)
const audioBuffer = ref<AudioBuffer | null>(null)
const gainNode = ref<GainNode | null>(null)
const currentTrack = ref<Track>(tracks[0])

const isPlaying = ref<boolean>(false)
const startTime = ref<number>(0)
const pausedAt = ref<number>(0)
const offset = ref<number>(0)

const loadAudio = async (): Promise<void> => {
  if (!audioContext.value) return

  try {
    const response = await fetch(currentTrack.value.audioSrc)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const decodedBuffer = await audioContext.value.decodeAudioData(arrayBuffer)

    audioBuffer.value = decodedBuffer
    console.log('Audio loaded')
  } catch (error) {
    console.error('Error loading audio:', error)
  }
}

const togglePlay = (): void => {
  if (!audioContext.value || !audioBuffer.value) return

  if (isPlaying.value) {
    // Pause logic
    const currentTime = audioContext.value.currentTime
    offset.value = currentTime - startTime.value + pausedAt.value
    audioSource.value?.stop()
    isPlaying.value = false
  } else {
    // Play logic
    audioSource.value = audioContext.value.createBufferSource()
    audioSource.value.buffer = audioBuffer.value

    if (!gainNode.value) {
      gainNode.value = audioContext.value.createGain()
      gainNode.value.connect(audioContext.value.destination)
    }

    audioSource.value.connect(gainNode.value)

    // Start playback from the offset position
    audioSource.value.start(0, offset.value)
    startTime.value = audioContext.value.currentTime
    pausedAt.value = offset.value

    isPlaying.value = true

    audioSource.value.onended = () => {
      if (isPlaying.value) {
        isPlaying.value = false
        offset.value = 0
        pausedAt.value = 0
      }
    }
  }
}

const stop = (): void => {
  if (!audioSource.value) return

  audioSource.value.disconnect()
  isPlaying.value = false
  pausedAt.value = 0
  startTime.value = 0
  offset.value = 0
}

onMounted(async () => {
  initAudioContext()
  await loadAudio()
})
</script>

<template>
  <div>
    <v-btn @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</v-btn>
    <v-btn @click="stop">Stop</v-btn>
  </div>
</template>

<style lang="scss" module></style>
