<script setup lang="ts">
import { computed } from 'vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'
import { formatTime } from '../../utils/timeUtils'

const { duration, currentTime, seek } = useAudioPlayer()

const progress = computed(() =>
  !duration.value ? 0 : (currentTime.value / duration.value) * 100
)

const handleSeek = (event: Event) => {
  const target = event.target as HTMLInputElement
  const seekTime = (Number(target.value) / 100) * duration.value
  seek(seekTime)
}
</script>

<template>
  <div :class="$style.progressBar" role="group" aria-label="Audio Progress">
    <span
      :class="$style.timeDisplay"
      aria-label="Current Time"
      data-testid="current-time"
      >{{ formatTime(currentTime) }}</span
    >
    <div :class="$style.sliderWrapper">
      <input
        type="range"
        :value="progress"
        min="0"
        max="100"
        step="0.1"
        @input="handleSeek"
        :class="$style.slider"
        aria-label="Seek Audio"
      />
    </div>
    <span :class="$style.timeDisplay" aria-label="Total Duration">{{
      formatTime(duration)
    }}</span>
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
  cursor: pointer;
}

.slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  transition: opacity 0.2s;
  cursor: pointer;
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
</style>
