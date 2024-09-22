<script setup lang="ts">
import { Track } from '../tracks'

defineProps<{
  track: Track
}>()
</script>

<template>
  <div :class="$style.container">
    <img :src="track.img" :class="$style.thumbnail" alt="Track thumbnail" />
    <div :class="$style.trackInfo">
      <div :class="$style.trackName">{{ track.title }}</div>
      <div :class="$style.artistName">{{ track.artist }}</div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '../styles/_variables.scss';

.container {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-right: 1rem;
}

.trackInfo {
  overflow: hidden;
  font-size: 0.8em;
}

.trackName {
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.artistName {
  color: $text-secondary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 0.5rem;
}
</style>
