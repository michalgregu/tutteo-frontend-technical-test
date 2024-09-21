<script setup lang="ts">
import { computed } from 'vue'
import { Track } from '../../tracks'

const props = defineProps<{
  track: Track | null
}>()
</script>

<template>
  <div v-if="track" :class="$style.thumbnailContainer">
    <img :src="track.img" :class="$style.thumbnail" />
  </div>
</template>

<style lang="scss" module>
@import '../styles/_variables.scss';

.thumbnailContainer {
  display: inline-block;
  margin: 1rem;
  background-color: $background-color-light;
  border-radius: 10px;
  padding: 4px;
}

.thumbnail {
  display: block;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 240px;
  height: 240px;
}
</style>
