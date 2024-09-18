import { ref } from 'vue'

export function useAudioContext() {
  const audioContext = ref<AudioContext | null>(null)

  const initAudioContext = () => {
    if ('AudioContext' in window) {
      audioContext.value = new AudioContext()
    } else if ('webkitAudioContext' in window) {
      audioContext.value = new (window as any).webkitAudioContext()
    } else {
      console.error('AudioContext not supported')
    }
  }
  return {
    audioContext,
    initAudioContext,
  }
}
