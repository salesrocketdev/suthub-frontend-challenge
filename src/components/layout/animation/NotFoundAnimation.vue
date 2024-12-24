<template>
  <div class="video-container">
    <video
      v-if="videoSource"
      :src="videoSource"
      autoplay
      loop
      muted
      class="w-full h-auto"
    ></video>
    <p v-else class="text-sm text-gray-500">Carregando animação...</p>
  </div>
</template>

<script setup>
import videoSource from "@/assets/lottie/not-found.webm";
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

video {
  max-width: 100%;
  height: auto;
}
</style>
