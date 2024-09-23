<script setup lang="ts">
import { Track } from '../../tracks'

defineProps<{
  track: Track
}>()
</script>

<template>
  <div
    :class="$style.container"
    role="group"
    aria-label="Current Track Information"
  >
    <img
      v-if="track.img"
      :src="track.img"
      :class="$style.thumbnail"
      :alt="`Album cover for ${track.title}`"
    />
    <div v-else :class="$style.thumbnailFallback" aria-hidden="true">
      No Image
    </div>
    <div :class="$style.trackInfo">
      <div :class="$style.trackName" aria-label="Track Title">
        {{ track.title }}
      </div>
      <div :class="$style.artistName" aria-label="Artist Name">
        {{ track.artist }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

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
