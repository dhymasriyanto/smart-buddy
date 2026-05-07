import { setState } from "./state.js"

export const setPosition = (type, x, y) => {
  type.style.transform = `translate(${x}px, ${y}px)`
}

export const flipImage = (type) => {
  type.style.transform === `scaleX(-1)` ? type.style.transform = `scaleX(1)` : type.style.transform = `scaleX(-1)`
}

const body = document.getElementById('body')
const mouth = document.getElementById('mouth')
const eyes = document.getElementById('eyes')
const panic = document.getElementById('panic')

export const resetAnimation = () => {
  body.src = 'assets/body_idle_1.png'
  if (mouth.style.display === 'none') mouth.style.display = 'block'
  if (eyes.style.display === 'none') eyes.style.display = 'block'
  if (panic.style.display === 'block') panic.style.display = 'none'
  mouth.src = 'assets/mouth_2.png'
  eyes.src = 'assets/eyes_4.png'

  setPosition(mouth, 0, 0)
  setPosition(eyes, 0, 0)

  setState('idle')
}
