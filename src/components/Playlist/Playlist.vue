<script setup lang="ts">
import TrackList from './TrackList.vue'
</script>

<template>
  <v-card :class="$style.playlist">
    <v-card-title :class="$style.playlistTitle">Playlist</v-card-title>
    <v-card-text :class="$style.playlistContent">
      <TrackList />
    </v-card-text>
  </v-card>
</template>

<style lang="scss" module>
@import '../../styles/variables';

.playlist {
  height: 100%;
  background-color: $background-color-light;
  border-radius: 8px;
}

.playlistTitle {
  font-size: 1.8rem !important;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.05);
  padding-top: 0.8rem !important;
}

.playlistContent {
  padding: 0 0.8rem !important;
}

@media (max-width: 599px) {
  .playlistTitle {
    text-align: center;
    font-size: 1rem !important;
  }

  .playlistContent {
    padding: 0.2rem !important;
  }
}
</style>
