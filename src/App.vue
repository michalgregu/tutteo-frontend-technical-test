<script setup lang="ts">
import { ref } from 'vue'
import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'
import Playlist from './components/Playlist/Playlist.vue'
import CurrentTrackInfo from './components/Playlist/CurrentTrackInfo.vue'
import { tracks, Track } from './tracks'

const currentTrack = ref<Track | null>(tracks[0])

const handleSelectTrack = (track: Track) => {
  currentTrack.value = track
}
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="8">
            <CurrentTrackInfo :track="currentTrack" />
            <AudioPlayer :track="currentTrack" />
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
