<script setup lang="ts">
defineProps<{
  isPlaying: boolean
}>()

defineEmits<{
  (e: 'togglePlay'): void
  (e: 'stop'): void
}>()
</script>

<template>
  <div :class="$style.controls">
    <button @click="$emit('togglePlay')" :class="$style.button">
      <font-awesome-icon :icon="isPlaying ? 'pause' : 'play'" />
    </button>
    <button @click="$emit('stop')" :class="$style.button">
      <font-awesome-icon icon="stop" />
    </button>
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.button {
  background-color: $primary-color;
  border: none;
  color: white;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button:hover {
  background-color: $primary-light;
}
</style>