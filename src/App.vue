<script setup lang="ts">
import AudioPlayer from './components/AudioPlayer.vue'
</script>

<template>
  <v-app>
    <div :class="$style.app">
      <AudioPlayer />
    </div>
  </v-app>
</template>

<style lang="scss" module>
.app {
  border-radius: 8px;
  padding: 20px;
}
</style>
