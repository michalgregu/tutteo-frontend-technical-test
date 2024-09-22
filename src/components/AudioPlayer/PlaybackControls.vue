<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isPlaying: boolean
}>()

const emit = defineEmits<{
  (e: 'togglePlay'): void
  (e: 'stop'): void
}>()

const playIcon = computed(() => (props.isPlaying ? 'fa-pause' : 'fa-play'))
</script>

<template>
  <div :class="$style.controls">
    <v-btn icon color="primary" flat size="x-small" :ripple="false">
      <font-awesome-icon icon="backward-step" :class="$style.icon" />
    </v-btn>
    <v-btn
      icon
      color="primary"
      flat
      :ripple="false"
      @click="emit('togglePlay')"
    >
      <font-awesome-icon :icon="playIcon" :class="$style.icon" />
    </v-btn>
    <v-btn icon color="primary" flat size="x-small" :ripple="false">
      <font-awesome-icon icon="forward-step" :class="$style.icon" />
    </v-btn>
    <v-btn
      icon
      size="x-small"
      color="primary"
      flat
      :ripple="false"
      @click="emit('stop')"
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
