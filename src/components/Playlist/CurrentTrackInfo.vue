<script setup lang="ts">
import { Track } from '../../tracks'

defineProps<{
  track: Track | null
}>()
</script>

<template>
  <v-card v-if="track" flat>
    <v-card-title>{{ track.title }}</v-card-title>
    <v-card-subtitle>{{ track.artist }}</v-card-subtitle>
  </v-card>
</template>
