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

const handleSeek = (newValue: number) => {
  const seekTime = (newValue / 100) * props.duration
  emit('seek', seekTime)
}
</script>

<template>
  <div :class="$style.progressBar">
    <v-slider
      :model-value="progress"
      :min="0"
      :max="100"
      @update:model-value="handleSeek"
    ></v-slider>
    <div :class="$style.timeDisplay">
      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
    </div>
  </div>
</template>

<style lang="scss" module>
.progressBar {
  width: 100%;
  padding: 10px 0;
}

.timeDisplay {
  text-align: center;
  margin-top: 5px;
}
</style>