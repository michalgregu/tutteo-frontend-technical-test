<script setup lang="ts">
import { ref, computed } from 'vue'
import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'
import Playlist from './components/Playlist/Playlist.vue'
import Thumbnail from './components/Thumbnail.vue'
import { tracks, Track } from './tracks'

const currentTrackIndex = ref<number>(0)
const currentTrack = computed(() => tracks[currentTrackIndex.value] || null)

const handleSelectTrack = (track: Track) => {
  const index = tracks.findIndex((t) => t.id === track.id)
  if (index !== -1) {
    currentTrackIndex.value = index
  }
}

const playNextTrack = () => {
  if (currentTrackIndex.value < tracks.length - 1) {
    currentTrackIndex.value++
  }
}
</script>

<template>
  <v-app :class="$style.app">
    <v-main :class="$style.main">
      <v-container :class="$style.appContainer" fluid>
        <v-row :class="$style.mainContent">
          <v-col cols="12" sm="8" :class="$style.playlistContainer">
            <Playlist
              :tracks="tracks"
              :currentTrack="currentTrack"
              @selectTrack="handleSelectTrack"
            />
          </v-col>
          <v-col cols="12" sm="4" :class="$style.thumbnailContainer">
            <Thumbnail :track="currentTrack" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app :class="$style.playerContainer">
      <AudioPlayer :track="currentTrack" @trackEnded="playNextTrack" />
    </v-footer>
  </v-app>
</template>

<style lang="scss" module>
@import './styles/variables';

.app {
  background-color: $background-color-dark;
  color: $text-primary;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  display: flex;
}

.appContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 80.5% !important;
  margin: 0 auto;
  padding: 16px;
}

.playerContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $background-color-dark !important;
}

@media (max-width: 600px) {
  
  .appContainer {
    max-width: 100% !important;
    padding: 0;
  }

  .thumbnailContainer {
    order: -1;
  }
}
</style>
