<script setup lang="ts">
import { Track } from '../../tracks'
import { formatTime } from '../../utils/timeUtils'

defineProps<{
  track: Track
  isActive: boolean
}>()

const emit = defineEmits<{
  (e: 'select', track: Track): void
}>()

const padZero = (id: string): string => {
  return id.length === 1 ? `0${id}` : id
}
</script>

<template>
  <v-list-item
    :ripple="false"
    :class="['rounded-lg', 'mb-2', { [$style.activeItem]: isActive }]"
    @click="emit('select', track)"
  >
    <template v-slot:prepend>
      <div :class="$style.trackId">{{ padZero(track.id) }}</div>
      <img :src="track.img" :class="$style.thumbnail" alt="Track thumbnail" />
    </template>

    <template v-slot:append>
      <div>{{ formatTime(track.duration) }}</div>
    </template>

    <v-list-item-title :class="$style.trackTitle">{{
      track.title
    }}</v-list-item-title>
    <v-list-item-subtitle :class="$style.trackArtist">{{
      track.artist
    }}</v-list-item-subtitle>
  </v-list-item>
</template>

<style lang="scss" module>
@import '../../styles/variables';

.activeItem {
  background-color: $primary-light !important;
  color: $background-color-light !important;
  border-radius: 4px !important;
}

.trackId {
  margin-right: 1rem;
}

.thumbnail {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 1rem;
}

@media (max-width: 1100px) {
  .thumbnail {
    display: none;
  }

  .trackTitle,
  .trackArtist {
    font-size: 0.8rem !important;
  }
}
</style>
