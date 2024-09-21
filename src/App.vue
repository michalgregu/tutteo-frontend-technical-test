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
  <v-app>
    <div :class="$style.appContainer">
      <div :class="$style.thumbnailContainer">
        <Thumbnail :track="currentTrack" />
      </div>
      <v-card :class="$style.playlistCard">
        <Playlist
          :tracks="tracks"
          :currentTrack="currentTrack"
          @selectTrack="handleSelectTrack"
        />
      </v-card>
      <v-card :class="$style.playerCard">
        <AudioPlayer :track="currentTrack" @trackEnded="playNextTrack" />
      </v-card>
    </div>
  </v-app>
</template>

<style lang="scss" module>
@import './styles/_variables.scss';

.appContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.thumbnailContainer {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.playlistCard,
.playerCard {
  margin-bottom: 16px;
  background-color: $background-color-light;
}
</style>
