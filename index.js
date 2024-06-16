const img = document.getElementById("img")

validSrcs = [
    "/assets/default_panxi.jpg",
    "/assets/moaning_agustin.png",
    "/assets/cooler_panxi.png",
]

let currentImage = Math.floor(Math.random() * validSrcs.length)

img.addEventListener("click", () => {
  img.src = validSrcs[currentImage]
  currentImage = (currentImage + 1) % validSrcs.length
})

img.src = validSrcs[currentImage]

