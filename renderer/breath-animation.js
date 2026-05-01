import { setPosition } from './utils.js'
import { breathFrames } from './frames.js'
import { getState } from './state.js'

const body = document.getElementById('body')
const eyes = document.getElementById('eyes')
const mouth = document.getElementById('mouth')

let breathIndex = 0

export const breath = () => {
  if (getState() !== 'idle') return

  if (breathIndex !== breathFrames.length - 1) {
    eyes.style.transform = setPosition(eyes, 0, -1)
    mouth.style.transform = setPosition(mouth, 0, -1)
  } else {
    eyes.style.transform = setPosition(eyes, 0, 1)
    mouth.style.transform = setPosition(mouth, 0, 1)
  }

  body.src = breathFrames[breathIndex++]

  if (breathIndex >= breathFrames.length) {
    breathIndex = 0
    return
  }

  if (getState() === 'idle') {
    setTimeout(breath, 300)
  }
}
