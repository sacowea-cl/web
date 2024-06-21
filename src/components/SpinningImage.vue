<script setup>
import { ref, onMounted } from 'vue'

const images = import.meta.glob('../assets/pics/*', { import: 'default' })
const currentImgSrc = ref('')
const currentTitle = ref('')

const setRandomImageSrc = async () => {
  const keys = Object.keys(images)
  const randomIndex = Math.floor(Math.random() * keys.length)
  const randomKey = keys[randomIndex]

  const image = await images[randomKey]()
  currentImgSrc.value = image
  console.log(image)
  currentTitle.value = image.match(/([a-zA-Z]+_[a-zA-Z]+)/)[0]
}
setRandomImageSrc()

const XY = ref({ x: 1, y: 1 });
const angulos = ref({ seno: 0, coseno: 0 });
const imageContainerRef = ref(null)

const handleMouseMove = (event) => {
  const rect = imageContainerRef.value.getBoundingClientRect()
  const top = rect.top
  const left = rect.left

  const { clientX, clientY } = event
  const middleX = left + rect.width / 2
  const middleY = top + rect.height / 2
  
  XY.value = {
    x: (clientX - middleX) / middleX,
    y: (clientY - middleY) / middleY,
  }

  const arctan2 = Math.atan2(XY.value.y, XY.value.x);
  angulos.value = {
    seno: Math.sin(arctan2),
    coseno: Math.cos(arctan2),
  }

  console.log(`Seno: ${angulos.value.seno}, Coseno: ${angulos.value.coseno}`);
}
document.addEventListener('mousemove', handleMouseMove);

</script>

<template>
  <h1>{{ currentTitle }}</h1>
  <main class="main">
    <div class="imageContainer" ref="imageContainerRef">
      <img :src="currentImgSrc" class="spinningImage" @click="setRandomImageSrc()" />
    </div>
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

.imageContainer {
  height: 50%;
  /* animation: spin 10s linear infinite; */
}

.spinningImage {
  object-fit: contain;
  object-position: center;
  height: 100%;
  transition: all 1s ease;
  animation: spin 5s linear infinite;

  user-select: none;

  transform-style: preserve-3d;
  filter: brightness(1);
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.7);
}



@keyframes spin {
  0% {
    transform: rotate3d(0, 0, 0, 0deg);

  }

  50% {
    transform: rotate3d(v-bind('-angulos.seno'), v-bind('angulos.coseno'), 0, 180deg);

  }

  100% {
    transform: rotate3d(v-bind('-angulos.seno'), v-bind('angulos.coseno'), 0, 360deg);
  }
}

@keyframes mirror {
  25% {
    filter: brightness(0.3);
  }

  75% {
    filter: brightness(1);
  }
}
</style>
