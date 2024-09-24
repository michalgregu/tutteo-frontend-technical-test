<script setup lang="ts">
import AudioPlayer from './components/AudioPlayer/AudioPlayer.vue'
import Playlist from './components/Playlist/Playlist.vue'
import Thumbnail from './components/Thumbnail.vue'
import { useAudioPlayer } from './composables/useAudioPlayer'

const { initializeAudio } = useAudioPlayer()

initializeAudio()
</script>

<template>
  <div
    :class="$style.appContainer"
    role="application"
    aria-label="Music Player Application"
  >
    <div :class="$style.contentWrapper">
      <Thumbnail :class="$style.thumbnail" />
      <Playlist :class="$style.playlist" aria-label="Music Playlist" />
    </div>
    <AudioPlayer :class="$style.player" aria-label="Audio Player Controls" />
  </div>
</template>

<style lang="scss" module>
@import './styles/variables';

.appContainer {
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: $text-primary;
  padding: 20px;
}

.contentWrapper {
  flex: 1;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'thumbnail'
    'playlist';
  overflow: hidden;
  gap: 20px;
}

.thumbnail {
  grid-area: thumbnail;
}

.playlist {
  grid-area: playlist;
  overflow-y: auto;
}

.player {
  width: 100%;
  margin-top: 20px;
}

@media (min-width: 800px) {
  .appContainer {
    align-items: center;
  }

  .contentWrapper {
    width: 60%;
    grid-template-columns: 6fr 4fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'playlist thumbnail';
    max-height: calc(100vh - var(--player-height));
  }

  .thumbnail,
  .playlist {
    overflow-y: auto;
  }

  .player {
    width: 60%;
    align-self: center;
  }
}
</style>
