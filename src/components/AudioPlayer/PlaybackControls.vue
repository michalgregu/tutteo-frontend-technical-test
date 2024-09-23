<script setup lang="ts">
import { computed } from 'vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const { isPlaying, togglePlay, stop, playNextTrack, playPreviousTrack } =
  useAudioPlayer()

const playIcon = computed(() => (isPlaying.value ? 'fa-pause' : 'fa-play'))
</script>

<template>
  <div :class="$style.controls">
    <v-btn
      icon
      color="primary"
      flat
      size="x-small"
      :ripple="false"
      @click="playPreviousTrack"
    >
      <font-awesome-icon icon="backward-step" :class="$style.icon" />
    </v-btn>
    <v-btn icon color="primary" flat :ripple="false" @click="togglePlay">
      <font-awesome-icon :icon="playIcon" :class="$style.icon" />
    </v-btn>
    <v-btn
      icon
      color="primary"
      flat
      size="x-small"
      :ripple="false"
      @click="playNextTrack"
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
