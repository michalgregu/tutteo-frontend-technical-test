<script setup lang="ts">
import { computed } from 'vue'
import { useAudioPlayer } from '../composables/useAudioPlayer'

const { currentTrack } = useAudioPlayer()

const formattedLicense = computed(() => {
  return currentTrack.value?.license_code
    ? `License: ${currentTrack.value.license_code}`
    : ''
})
const formattedSource = computed(() => {
  return currentTrack.value?.music_source
    ? `Music Source: ${currentTrack.value.music_source}`
    : ''
})
</script>

<template>
  <div v-if="currentTrack" :class="$style.thumbnailWrapper">
    <div :class="$style.thumbnailContainer">
      <img
        :src="currentTrack.img"
        :alt="currentTrack.title"
        :class="$style.thumbnail"
      />
    </div>
    <div :class="$style.trackInfo">
      <div>
        <h2 :class="$style.trackTitle">{{ currentTrack.title }}</h2>
        <p :class="$style.artistName">{{ currentTrack.artist }}</p>
      </div>
      <div :class="$style.additionalInfo">
        <p>{{ formattedSource }}</p>
        <p>{{ formattedLicense }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '../styles/_variables.scss';

.thumbnailWrapper {
  display: flex;
  flex-direction: column;
  background-color: $background-color-light;
  border-radius: 4px;
  padding: 6px;
  height: fit-content;
}

.thumbnail {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  border-radius: 4px;
}

.trackInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem 0.4rem;
  overflow: hidden;
}

.trackTitle {
  font-size: 1.2rem;
  font-weight: bold;
  color: $text-primary;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.artistName {
  font-size: 1rem;
  color: $text-secondary;
  margin: 0.5rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.additionalInfo {
  font-size: 0.8rem;
  color: adjust-color($text-secondary, $lightness: 10%);
}

@media (max-width: 800px) {
  .thumbnailWrapper {
    flex-direction: row;
    align-items: center;
  }

  .thumbnailContainer {
    flex: 0 0 40%;
    max-width: 40%;
  }

  .trackInfo {
    flex: 1;
    padding: 0.5rem;
  }

  .trackTitle,
  .artistName,
  .additionalInfo {
    text-align: left;
  }

  .additionalInfo {
    font-size: 0.5rem;
  }
}

@media (max-width: 1100px) {
  .trackInfo {
    font-size: 0.6rem;
  }
}
</style>
