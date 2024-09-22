<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  initialVolume: number
}>()

const emit = defineEmits<{
  (e: 'volumeChange', volume: number): void
}>()

const volume = ref(props.initialVolume)
const previousVolume = ref(props.initialVolume)
const menuOpen = ref(false)

watch(volume, (newVolume) => {
  if (newVolume > 0) {
    previousVolume.value = newVolume
  }
  emit('volumeChange', newVolume)
})

const getVolumeIcon = (vol: number) => {
  if (vol === 0) return 'volume-xmark'
  if (vol < 0.5) return 'volume-low'
  return 'volume-high'
}

const toggleMute = () => {
  if (volume.value > 0) {
    volume.value = 0
  } else {
    volume.value = previousVolume.value
  }
}
</script>

<template>
  <div :class="$style.volumeControl">
    <v-menu
      v-model="menuOpen"
      :close-on-content-click="false"
      location="top"
      open-on-hover
      open-delay="0"
      elevation="0"
      :class="$style.menu"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          flat
          size="small"
          :ripple="false"
          v-bind="props"
          :class="$style.volumeButton"
          @click.stop="toggleMute"
        >
          <font-awesome-icon :icon="getVolumeIcon(volume)" />
        </v-btn>
      </template>

      <v-sheet
        class="rounded-lg mb-2"
        :class="$style.volumeSheet"
        elevation="1"
      >
        <v-slider
          v-model="volume"
          direction="vertical"
          min="0"
          max="1"
          width="20px"
          track-size="2px"
          thumb-size="14px"
          step="0.01"
          hide-details
          :ripple="false"
          :class="$style.volumeSlider"
        >
        </v-slider>
      </v-sheet>
    </v-menu>
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

.volumeButton {
  color: $primary-color !important;
}

.volumeSheet {
  padding: 8px !important;
  background-color: $background-color-light !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

:global(.v-slider.v-input--vertical .v-slider-track__fill) {
  background-color: $primary-color;
}

:global(.v-slider.v-input--vertical .v-slider-thumb) {
  color: $primary-color;
}

:global(.v-slider.v-input--vertical > .v-input__control) {
  min-height: 90px !important;
}
</style>
