<script setup lang="ts">
import { Track } from '../../tracks'

const props = defineProps<{
  track: Track
}>()
</script>

<template>
  <div :class="$style.trackInfo">
    <div :class="$style.trackName">{{ track.name }}</div>
    <div :class="$style.artistName">{{ track.artist }}</div>
  </div>
</template>

<style lang="scss" module>
@import '../styles/_variables.scss';

.trackInfo {
  max-width: 70%;
  overflow: hidden;
}

.trackName {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artistName {
  font-size: 0.9em;
  color: $text-secondary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
