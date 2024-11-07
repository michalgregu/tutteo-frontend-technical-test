<script setup lang="ts">
import { ref } from 'vue'
import { useAudioPlayer } from '../../composables/useAudioPlayer'
import { useKeyboardControls } from '../../composables/useKeyboardControls'

import PlaybackControls from './PlaybackControls.vue'
import ProgressBar from './ProgressBar.vue'
import VolumeControl from './VolumeControl.vue'
import CurrentTrackInfo from './CurrentTrackInfo.vue'

const { currentTrack } = useAudioPlayer()
const volumeControlRef = ref<InstanceType<typeof VolumeControl> | null>(null)

useKeyboardControls(volumeControlRef)
</script>

<template>
  <div
    v-if="currentTrack"
    :class="$style.audioPlayer"
    role="region"
    aria-label="Audio Player"
  >
    <PlaybackControls :class="$style.controls" />
    <CurrentTrackInfo :track="currentTrack" :class="$style.trackInfo" />
    <ProgressBar :class="$style.progressBar" />
    <VolumeControl
      :class="$style.volumeControl"
      ref="volumeControlRef"
      data-testid="volume-control"
    />
  </div>
</template>

<style lang="scss" module>
@import '../../styles/_variables.scss';

.audioPlayer {
  width: 80%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: $background-color-light;
}

.controls {
  margin-right: 1rem;
}

.trackInfo {
  flex: 0 1 auto;
  margin-right: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.progressBar {
  flex: 3;
  margin-right: 1rem;
}

@media (max-width: 599px) {
  .audioPlayer {
    width: 100%;
    flex-wrap: wrap;
  }

  .controls {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .trackInfo {
    display: none;
  }

  .progressBar {
    order: 2;
  }

  .volumeControl {
    display: none;
  }
}

@media (max-width: 1100px) {
  .trackInfo {
    display: none;
  }
}
</style>
