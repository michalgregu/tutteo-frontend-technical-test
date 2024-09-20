<script setup lang="ts">
import { ref, computed } from 'vue'
import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'
import Playlist from './components/Playlist/Playlist.vue'
import CurrentTrackInfo from './components/Playlist/CurrentTrackInfo.vue'
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
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <CurrentTrackInfo :track="currentTrack" />
            <AudioPlayer :track="currentTrack" @trackEnded="playNextTrack" />
          </v-col>
          <v-col cols="12" md="4">
            <Playlist
              :tracks="tracks"
              :currentTrack="currentTrack"
              @selectTrack="handleSelectTrack"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" module>
.app {
  border-radius: 8px;
  padding: 20px;
}
</style>
