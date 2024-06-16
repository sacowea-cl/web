const img = document.getElementById("img")
const title = document.getElementById("main_title")

validSrcs = [
    "/assets/default_panxi.jpg",
    "/assets/moaning_agustin.png",
    "/assets/cooler_panxi.png",
    "/assets/amazed_davila.jpeg",
    "/assets/android_juan.jpeg",
    "/assets/default_bruno.jpeg",
    "/assets/default_harris.jpeg",
    "/assets/default_juan.jpeg",
    "/assets/waving_retard.jpeg"
]

const cleanName = (src) => {
  const filename = src.split("/").pop()
  const name = filename.split(".")[0]
  const nameList = name.replace(/_/g, " ").split(" ")
  const firstWord = nameList[0][0].toUpperCase() + nameList[0].slice(1)
  const secondWord = nameList[1][0].toUpperCase() + nameList[1].slice(1)
  return firstWord + " " + secondWord
}

let currentImage = Math.floor(Math.random() * validSrcs.length)

img.addEventListener("click", () => {
  img.src = validSrcs[currentImage]
  title.innerText = cleanName(img.src)
  currentImage = (currentImage + 1) % validSrcs.length
})

img.src = validSrcs[currentImage]
title.innerText = cleanName(img.src)