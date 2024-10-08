import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { tracks as initialTracks, Track } from '../tracks'

const tracks = ref<Track[]>(initialTracks)
const currentTrackIndex = ref<number>(0)
const currentTrack = computed(
  () => tracks.value[currentTrackIndex.value] || null
)

const audioContext = ref<AudioContext | null>(null)
const audioSource = ref<AudioBufferSourceNode | null>(null)
const gainNode = ref<GainNode | null>(null)

const duration = ref<number>(0)
const isPlaying = ref<boolean>(false)
const startTime = ref<number>(0)
const currentTime = ref<number>(0)
const offset = ref<number>(0)
const volume = ref<number>(1)
const isLoaded = ref<boolean>(false)
const isPreloading = ref<boolean>(false)

const preloadedBuffers = new Map<string, AudioBuffer>()

export function useAudioPlayer() {
  const ensureAudioContext = () => {
    if (!audioContext.value) {
      audioContext.value = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
    }
    // Resume context if it was suspended (e.g., by browser policies)
    if (audioContext.value?.state === 'suspended') {
      audioContext.value.resume()
    }
    if (!audioContext.value) {
      throw new Error('Failed to create AudioContext')
    }
    return audioContext.value
  }

  const resetState = () => {
    startTime.value = 0
    offset.value = 0
    currentTime.value = 0
  }

  const loadTrack = async (track: Track): Promise<AudioBuffer> => {
    ensureAudioContext()
    if (!audioContext.value) throw new Error('AudioContext not initialized')

    // Check if the track is already preloaded
    if (preloadedBuffers.has(track.id)) {
      const buffer = preloadedBuffers.get(track.id)!
      track.duration = buffer.duration
      return buffer
    }

    try {
      // Fetch and decode audio data
      const response = await fetch(track.audioSrc)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const arrayBuffer = await response.arrayBuffer()
      const decodedBuffer =
        await audioContext.value.decodeAudioData(arrayBuffer)

      // Cache the decoded buffer and update track duration
      preloadedBuffers.set(track.id, decodedBuffer)
      track.duration = decodedBuffer.duration
      return decodedBuffer
    } catch (error) {
      console.error('Error loading audio:', error)
      throw error
    }
  }

  const loadAllTrackDurations = async () => {
    for (const track of tracks.value) {
      if (!track.duration) {
        await loadTrack(track)
      }
    }
  }

  const loadInitialTrack = async () => {
    if (!currentTrack.value) return
    try {
      const buffer = await loadTrack(currentTrack.value)
      duration.value = buffer.duration
      isLoaded.value = true
    } catch (error) {
      console.error('Error loading initial track:', error)
      isLoaded.value = false
    }
  }

  const preloadRemainingTracks = async () => {
    isPreloading.value = true
    for (const track of tracks.value) {
      if (
        track.id !== currentTrack.value?.id &&
        !preloadedBuffers.has(track.id)
      ) {
        await loadTrack(track).catch((error) =>
          console.error(`Error preloading track ${track.id}:`, error)
        )
      }
    }
    isPreloading.value = false
  }

  const selectTrack = async (track: Track) => {
    const index = tracks.value.findIndex((t) => t.id === track.id)
    if (index !== -1) {
      currentTrackIndex.value = index
      await loadTrack(track)
      duration.value = preloadedBuffers.get(track.id)!.duration
      isLoaded.value = true
      play()
    }
  }

  const playNextTrack = async () => {
    currentTrackIndex.value =
      (currentTrackIndex.value + 1) % tracks.value.length
    await selectTrack(tracks.value[currentTrackIndex.value])
  }

  const playPreviousTrack = async () => {
    currentTrackIndex.value =
      (currentTrackIndex.value - 1 + tracks.value.length) % tracks.value.length
    await selectTrack(tracks.value[currentTrackIndex.value])
  }

  const play = async (startOffset: number = offset.value): Promise<void> => {
    ensureAudioContext()
    if (!audioContext.value || !currentTrack.value) return

    // Retrieve the preloaded audio buffer for the current track
    const audioBuffer = preloadedBuffers.get(currentTrack.value.id)
    if (!audioBuffer) return

    // Stop and disconnect any existing audio source
    if (audioSource.value) {
      audioSource.value.stop()
      audioSource.value.disconnect()
    }

    // Create a new audio source and set its buffer
    audioSource.value = audioContext.value.createBufferSource()
    audioSource.value.buffer = audioBuffer

    // Create a gain node if it doesn't exist and connect it to the destination
    if (!gainNode.value) {
      gainNode.value = audioContext.value.createGain()
      gainNode.value.connect(audioContext.value.destination)
    }
    audioSource.value.connect(gainNode.value)

    // Start playing the audio and update playback state
    audioSource.value.start(0, startOffset)
    startTime.value = audioContext.value.currentTime
    offset.value = startOffset
    isPlaying.value = true

    // Start updating the current time
    updateCurrentTime()

    audioSource.value.onended = () => {
      // Check if we're at the end of the track (with a small buffer for rounding errors)
      if (currentTime.value >= duration.value - 0.1) {
        isPlaying.value = false
        resetState()
        playNextTrack()
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

  const togglePlay = async () => {
    if (!currentTrack.value) return
    if (!isLoaded.value) {
      await loadTrack(currentTrack.value!)
    }
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
    if (!audioContext.value || !currentTrack.value) return

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

  const setVolume = (newVolume: number) => {
    volume.value = newVolume
    if (gainNode.value && audioContext.value) {
      gainNode.value.gain.setValueAtTime(
        Number(newVolume),
        audioContext.value.currentTime
      )
    }
  }

  const initializeAudio = async () => {
    await loadInitialTrack()
    await loadAllTrackDurations()
    preloadRemainingTracks()
  }

  const cleanup = () => {
    if (isPlaying.value) {
      pause()
    }

    if (audioSource.value) {
      audioSource.value.stop()
      audioSource.value.disconnect()
      audioSource.value = null
    }

    if (gainNode.value) {
      gainNode.value.disconnect()
      gainNode.value = null
    }

    if (audioContext.value) {
      audioContext.value.close()
      audioContext.value = null
    }

    preloadedBuffers.clear()

    duration.value = 0
    isPlaying.value = false
    startTime.value = 0
    currentTime.value = 0
    offset.value = 0
    isLoaded.value = false
    isPreloading.value = false
  }

  onMounted(async () => {
    if (currentTrack.value) {
      await loadTrack(currentTrack.value)
    }
  })

  onUnmounted(() => {
    cleanup()
  })

  watch(currentTrack, async (newTrack) => {
    if (newTrack) {
      if (isPlaying.value) {
        pause()
      }
      resetState()
      await loadTrack(newTrack)
    }
  })

  return {
    tracks,
    currentTrackIndex,
    currentTrack,
    duration,
    isPlaying,
    currentTime,
    volume,
    isLoaded,
    isPreloading,
    ensureAudioContext,
    selectTrack,
    playNextTrack,
    playPreviousTrack,
    play,
    pause,
    togglePlay,
    stop,
    seek,
    setVolume,
    initializeAudio,
  }
}
