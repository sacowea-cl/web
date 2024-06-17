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
  console.log(image)
  currentTitle.value = image.match(/([a-zA-Z]+_[a-zA-Z]+)/)[0]
}
setRandomImageSrc()

const angle = ref({ x: 1, y: 1 })

const clickCoordinates = { x: 0, y: 0 }

const mouseClick = (e) => {

}

const mouseDown = (e) => {
  // const middleX = window.innerWidth / 2
  // const distanceX = (e.clientX - middleX) / middleX

  // const middleY = window.innerHeight / 2
  // const distanceY = -(e.clientY - middleY) / middleY


  // console.log(distanceX, distanceY)
  // angle.value.x = distanceY
  // angle.value.y = distanceX

  clickCoordinates.x = e.clientX
  clickCoordinates.y = e.clientY
}

const mouseUp = (e) => {
  // const x = (e.clientX - clickCoordinates.x) / window.innerWidth
  // const y = (e.clientY - clickCoordinates.y) / window.innerHeight

  // console.log(x, y)

  // angle.value.x = -y
  // angle.value.y = x
}


</script>

<template>
  <h1>{{ currentTitle }}</h1>
  <main class="main" @mousedown="mouseDown" @mouseup="mouseUp">
    <div class="imageContainer">
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

.master {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
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
  /* transform: scale(1, 1); */
}



@keyframes spin {
  0% {
    transform: rotate3d(v-bind('angle.x'), v-bind('angle.y'), 0, 0deg);

  }

  50% {
    transform: rotate3d(v-bind('angle.x'), v-bind('angle.y'), 0, 180deg);

  }

  100% {
    transform: rotate3d(v-bind('angle.x'), v-bind('angle.y'), 0, 360deg);
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
