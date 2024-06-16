<script setup>
import { ref } from 'vue'

const images = import.meta.glob('../assets/pics/*', { import: 'default' })
const currentImgSrc = ref('')
const currentTitle = ref('')

const setRandomImageSrc = async () => {
  const keys = Object.keys(images)
  const randomIndex = Math.floor(Math.random() * keys.length)
  const randomKey = keys[randomIndex]

  const image = await images[randomKey]()
  currentImgSrc.value = image
  currentTitle.value = image.split('/').pop().split('.')[0]
}

setRandomImageSrc()
</script>

<template>
  <h1>{{ currentTitle }}</h1>
  <main class="main">
    <img :src="currentImgSrc" class="spinningImage" @click="setRandomImageSrc()" />
  </main>

</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1 {
  text-align: center;
}


.spinningImage {
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
  animation: spin 5s linear infinite;
}



@keyframes spin {
  0% {
    transform: rotate3d(1, 1, 1, 0deg);
  }

  50% {
    transform: rotate3d(1, 1, 1, 180deg);
  }

  100% {
    transform: rotate3d(1, 1, 1, 360deg);
  }
}
</style>
