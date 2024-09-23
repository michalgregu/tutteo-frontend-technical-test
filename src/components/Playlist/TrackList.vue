<script setup lang="ts">
import { Track } from '../../tracks'
import TrackItem from './TrackItem.vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const { currentTrack, tracks, selectTrack } = useAudioPlayer()
</script>

<template>
  <v-list :class="$style.trackList" aria-label="Track List">
    <template v-if="tracks.length">
      <TrackItem
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        :isActive="currentTrack?.id === track.id"
        @select="selectTrack"
      />
    </template>
    <v-list-item v-else>No tracks available</v-list-item>
  </v-list>
</template>

<style lang="scss" module>
@import '../../styles/variables';

.v-list-item--active {
  background-color: $accent-color;
}
</style>
