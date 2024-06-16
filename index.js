const img = document.getElementById("img")

validSrcs = [
    "/assets/image.png",
    "/assets/default_panxi.jpg",
    "/assets/cooler_panxi.png",
]

let currentImage = Math.floor(Math.random() * validSrcs.length)

img.addEventListener("click", () => {
  img.src = validSrcs[currentImage]
  currentImage = (currentImage + 1) % validSrcs.length
})

img.src = validSrcs[currentImage]

