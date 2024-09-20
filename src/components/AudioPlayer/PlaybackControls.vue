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
  <div>
    <v-btn @click="$emit('togglePlay')">{{ isPlaying ? 'Pause' : 'Play' }}</v-btn>
    <v-btn @click="$emit('stop')">Stop</v-btn>
  </div>
</template>

<style lang="scss" module></style>