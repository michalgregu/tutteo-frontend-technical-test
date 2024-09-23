<script setup lang="ts">
import { computed } from 'vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const { isPlaying, togglePlay, stop, playNextTrack, playPreviousTrack } =
  useAudioPlayer()

const playIcon = computed(() => (isPlaying.value ? 'fa-pause' : 'fa-play'))
</script>

<template>
  <div :class="$style.controls" role="group" aria-label="Playback Controls">
    <v-btn
      icon
      color="primary"
      flat
      size="x-small"
      :ripple="false"
      @click="playPreviousTrack"
      aria-label="Previous Track"
    >
      <font-awesome-icon icon="backward-step" :class="$style.icon" />
    </v-btn>
    <v-btn
      icon
      color="primary"
      flat
      :ripple="false"
      @click="togglePlay"
      :aria-label="isPlaying ? 'Pause' : 'Play'"
    >
      <font-awesome-icon :icon="playIcon" :class="$style.icon" />
    </v-btn>
    <v-btn
      icon
      color="primary"
      flat
      size="x-small"
      :ripple="false"
      @click="playNextTrack"
      aria-label="Next Track"
    >
      <font-awesome-icon icon="forward-step" :class="$style.icon" />
    </v-btn>
    <v-btn
      icon
      size="x-small"
      color="primary"
      flat
      :ripple="false"
      @click="stop"
      aria-label="Stop"
    >
      <font-awesome-icon icon="stop" :class="$style.icon" />
    </v-btn>
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}
</style>
