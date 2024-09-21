<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentTime: number
  duration: number
}>()

const emit = defineEmits<{
  (e: 'seek', time: number): void
}>()

const progress = computed(() => (props.currentTime / props.duration) * 100)

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const handleSeek = (event: Event) => {
  const target = event.target as HTMLInputElement
  const seekTime = (Number(target.value) / 100) * props.duration
  emit('seek', seekTime)
}
</script>

<template>
  <div :class="$style.progressBar">
    <span :class="$style.timeDisplay">{{ formatTime(currentTime) }}</span>
    <div :class="$style.sliderWrapper">
      <input
        type="range"
        :value="progress"
        min="0"
        max="100"
        step="0.1"
        @input="handleSeek"
        :class="$style.slider"
      />
    </div>
    <span :class="$style.timeDisplay">{{ formatTime(duration) }}</span>
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

.progressBar {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}

.timeDisplay {
  flex: 0 0 auto;
  font-size: 0.8rem;
  color: $text-secondary;
}

.sliderWrapper {
  flex: 1;
  display: flex;
  align-items: center;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: $primary-color;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: $primary-color;
  cursor: pointer;
}

@media (max-width: 480px) {
  .progressBar {
    flex-wrap: wrap;
  }

  .sliderWrapper {
    order: -1;
    flex-basis: 100%;
    margin-bottom: 5px;
  }

  .timeDisplay {
    flex: 1;
    text-align: center;
  }
}
</style>
