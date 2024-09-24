<script setup lang="ts">
import { useAudioPlayer } from '../composables/useAudioPlayer'

const { currentTrack } = useAudioPlayer()
</script>

<template>
  <div
    :class="$style.thumbnailWrapper"
    role="region"
    aria-label="Current Track Information"
  >
    <v-fade-transition mode="out-in" duration="50">
      <div :class="$style.thumbnailContainer" :key="currentTrack.id">
        <img
          :src="currentTrack.img"
          :alt="`Album cover for ${currentTrack.title} by ${currentTrack.artist}`"
          :class="$style.thumbnail"
        />
      </div>
    </v-fade-transition>
    <v-fade-transition mode="out-in" duration="50">
      <div :class="$style.trackInfo" :key="currentTrack.id">
        <div>
          <h2 :class="$style.trackTitle" id="track-title">
            {{ currentTrack.title }}
          </h2>
          <p
            :class="$style.artistName"
            id="track-artist"
            aria-describedby="track-title"
          >
            {{ currentTrack.artist }}
          </p>
        </div>
        <div
          :class="$style.additionalInfo"
          aria-label="Track Source and License Information"
        >
          <p>{{ `Music Source: ${currentTrack.music_source}` }}</p>
          <p>{{ `License: ${currentTrack.license_code}` }}</p>
        </div>
      </div>
    </v-fade-transition>
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
