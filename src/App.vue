<script setup lang="ts"></script>

<template>
  <v-app>
    <div :class="$style.audioPlayer">
      Hello
      <v-btn> Vuetify works </v-btn>
    </div>
    <HelloWorld msg="Vite + Vue" />
  </v-app>
</template>

<style module>
.audioPlayer {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}
</style>
