<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  initialVolume: number
}>()

const emit = defineEmits<{
  (e: 'volumeChange', volume: number): void
}>()

const volume = ref(props.initialVolume)

watch(volume, (newVolume) => {
  emit('volumeChange', newVolume)
})

const getVolumeIcon = (vol: number) => {
  if (vol === 0) return 'volume-xmark'
  if (vol < 0.5) return 'volume-low'
  return 'volume-high'
}
</script>

<template>
  <div :class="$style.volumeControl">
    <font-awesome-icon :icon="getVolumeIcon(volume)" :class="$style.icon" />
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      v-model="volume"
      :class="$style.slider"
    />
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

.volumeControl {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.2rem;
  color: $primary-color;
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
</style>
