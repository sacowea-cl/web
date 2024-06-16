const img = document.getElementById("img")

validSrcs = [
    "/assets/default_panxi.jpg",
    "/assets/cooler_panxi.png",
]

let currentImage = 0

img.addEventListener("click", () => {
  img.src = validSrcs[currentImage]
  currentImage = (currentImage + 1) % validSrcs.length
})

