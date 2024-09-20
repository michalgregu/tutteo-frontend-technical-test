<script setup lang="ts">
import { Track } from '../../tracks'
import TrackItem from './TrackItem.vue'

defineProps<{
  tracks: Track[]
  currentTrack: Track | null
}>()

const emit = defineEmits<{
  (e: 'selectTrack', track: Track): void
}>()
</script>

<template>
  <v-list>
    <TrackItem
      v-for="track in tracks"
      :key="track.id"
      :track="track"
      :isActive="currentTrack?.id === track.id"
      @select="emit('selectTrack', $event)"
    />
  </v-list>
</template>
