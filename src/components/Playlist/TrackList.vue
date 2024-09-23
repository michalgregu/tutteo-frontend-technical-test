<script setup lang="ts">
import { Track } from '../../tracks'
import TrackItem from './TrackItem.vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const { currentTrack, tracks, selectTrack } = useAudioPlayer()
</script>

<template>
  <v-list>
    <TrackItem
      v-for="track in tracks"
      :key="track.id"
      :track="track"
      :isActive="currentTrack?.id === track.id"
      @select="selectTrack"
    />
  </v-list>
</template>

<style lang="scss" module>
@import '../../styles/variables';

.v-list-item--active {
  background-color: $accent-color;
}
</style>
