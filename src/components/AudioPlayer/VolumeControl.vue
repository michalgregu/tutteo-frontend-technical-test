<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialVolume?: number
}>()

const emit = defineEmits<{
  (e: 'volumeChange', volume: number): void
}>()

const volume = ref(props.initialVolume ?? 1)

const handleVolumeChange = (newVolume: number) => {
  volume.value = newVolume
  emit('volumeChange', newVolume)
}
</script>

<template>
  <div :class="$style.volumeControl">
    <v-slider
      v-model="volume"
      :min="0"
      :max="1"
      :step="0.01"
      @update:model-value="handleVolumeChange"
    ></v-slider>
  </div>
</template>

<style lang="scss" module>
.volumeControl {
  width: 100px;
  margin: 10px 0;
}
</style>