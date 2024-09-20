<script setup lang="ts">
import { Track } from '../../tracks'

defineProps<{
  track: Track
  isActive: boolean
}>()

const emit = defineEmits<{
  (e: 'select', track: Track): void
}>()
</script>

<template>
  <v-list-item
    :class="{ 'bg-primary': isActive }"
    @click="emit('select', track)"
  >
    <v-list-item-title>{{ track.title }}</v-list-item-title>
    <v-list-item-subtitle>{{ track.artist }}</v-list-item-subtitle>
  </v-list-item>
</template>
