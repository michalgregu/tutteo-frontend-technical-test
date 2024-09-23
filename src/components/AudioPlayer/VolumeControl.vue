<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'

const { volume, setVolume } = useAudioPlayer()

const volumePercentage = computed(() => Math.round(volume.value * 100))

const previousVolume = ref<number>(volume.value)
const menuOpen = ref<boolean>(false)

watch(volume, (newVolume) => {
  if (newVolume > 0) {
    previousVolume.value = newVolume
  }
})

const getVolumeIcon = (vol: number): string => {
  if (vol === 0) return 'volume-xmark'
  if (vol < 0.5) return 'volume-low'
  return 'volume-high'
}

const toggleMute = () => {
  if (volume.value > 0) {
    setVolume(0)
  } else {
    setVolume(previousVolume.value)
  }
}

const openMenu = () => {
  menuOpen.value = true
}

const closeMenu = () => {
  menuOpen.value = false
}

defineExpose({ openMenu, closeMenu })
</script>

<template>
  <div :class="$style.volumeControl" role="group" aria-label="Volume Control">
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
          :aria-label="`Volume ${volumePercentage}%. Click to ${volume > 0 ? 'mute' : 'unmute'}.`"
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
          :model-value="volume"
          @update:model-value="setVolume"
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
          :aria-label="`Adjust volume. Current volume: ${volumePercentage}%`"
        >
        </v-slider>
      </v-sheet>
    </v-menu>
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

.volumeControl {
  position: relative;
}

.volumeButton {
  color: $primary-color !important;
}

.menu {
  display: flex;
  justify-content: center;
}

.volumeSheet {
  padding: 8px !important;
  background-color: $background-color-light !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  width: 40px !important;
  overflow: hidden !important;
}

.volumeSlider {
  width: 100% !important;
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
