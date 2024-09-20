<script setup lang="ts">
import { Track } from '../../tracks'
import TrackList from './TrackList.vue'

const props = defineProps<{
  tracks: Track[]
  currentTrack: Track | null
}>()

const emit = defineEmits<{
  (e: 'selectTrack', track: Track): void
}>()
</script>

<template>
  <v-card>
    <v-card-title>Playlist</v-card-title>
    <v-card-text>
      <TrackList
        :tracks="props.tracks"
        :currentTrack="currentTrack"
        @selectTrack="emit('selectTrack', $event)"
      />
    </v-card-text>
  </v-card>
</template>
