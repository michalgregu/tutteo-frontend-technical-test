<script setup lang="ts">
import { computed } from 'vue'
import { Track } from '../tracks'

const props = defineProps<{
  track: Track | null
}>()

const formattedLicense = computed(() => {
  return props.track?.license_code ? `License: ${props.track.license_code}` : ''
})
const formattedSource = computed(() => {
  return props.track?.music_source
    ? `Music Source: ${props.track.music_source}`
    : ''
})
</script>

<template>
  <div v-if="track" :class="$style.thumbnailWrapper">
    <div :class="$style.thumbnailContainer">
      <img :src="track.img" :alt="track.title" :class="$style.thumbnail" />
    </div>
    <div :class="$style.trackInfo">
      <h2 :class="$style.trackTitle">{{ track.title }}</h2>
      <p :class="$style.artistName">{{ track.artist }}</p>
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
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: bold;
  color: $text-primary;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.artistName {
  font-size: clamp(0.8rem, 2.5vw, 1.2rem);
  color: $text-secondary;
  margin: 0.5rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.additionalInfo {
  font-size: 0.8rem;
  color: adjust-color($text-secondary, $lightness: 10%);
}

@media (max-width: 599px) {
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
</style>
