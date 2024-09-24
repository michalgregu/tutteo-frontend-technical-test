import { onMounted, onUnmounted, Ref } from 'vue'
import { useAudioPlayer } from './useAudioPlayer'
import VolumeControl from './VolumeControl.vue'

export function useKeyboardControls(
  volumeControlRef: Ref<InstanceType<typeof VolumeControl> | null>
) {
  const {
    togglePlay,
    playNextTrack,
    playPreviousTrack,
    setVolume,
    volume,
    seek,
    currentTime,
    duration,
  } = useAudioPlayer()

  let volumeControlTimeout: number | null = null

  // Show volume control menu when volume is changed by keyboard
  const showVolumeControl = () => {
    if (volumeControlRef.value) {
      volumeControlRef.value.openMenu()

      if (volumeControlTimeout) {
        clearTimeout(volumeControlTimeout)
      }

      volumeControlTimeout = setTimeout(() => {
        if (volumeControlRef.value) {
          volumeControlRef.value.closeMenu()
        }
      }, 2000)
    }
  }

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'Space':
        event.preventDefault()
        togglePlay()
        break
      case 'ArrowRight':
        playNextTrack()
        break
      case 'ArrowLeft':
        playPreviousTrack()
        break
      case 'ArrowUp':
        setVolume(Math.min(volume.value + 0.1, 1))
        showVolumeControl()
        break
      case 'ArrowDown':
        setVolume(Math.max(volume.value - 0.1, 0))
        showVolumeControl()
        break
      case 'KeyJ':
        seek(Math.max(currentTime.value - 10, 0))
        break
      case 'KeyL':
        seek(Math.min(currentTime.value + 10, duration.value))
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
    if (volumeControlTimeout) {
      clearTimeout(volumeControlTimeout)
    }
  })
}
