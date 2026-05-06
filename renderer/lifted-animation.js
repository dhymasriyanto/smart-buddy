import { liftedFrames, panicFrames } from './frames.js'
import { getState } from './state.js'

const body = document.getElementById('body')
const mouth = document.getElementById('mouth')
const eyes = document.getElementById('eyes')
const panic = document.getElementById('panic')

let index = 0,
  liftedId = null,
  lastLifted = null,
  panicStarted = false

export let panicId = null

export const lifted = (lastInteractionLifted = null) => {
  if (getState() !== 'lifted') return
  
  if (lastInteractionLifted !== null) {
    lastLifted = lastInteractionLifted
  }

  if (Date.now() - lastLifted > 1500  && !panicStarted) {
    panic.style.display = 'block'
    panicEffect()
    panicStarted = true
  }

  mouth.style.display = 'none'
  eyes.style.display = 'none'
  
  if (index >= liftedFrames.length) {
    index = 0
  }
  
  body.src = liftedFrames[index ++]
  
  liftedId = setTimeout(lifted, 100)
}

let indexPanic = 0

export const panicEffect = () => {

  if (getState() !== 'lifted' && getState() !== 'walking') return

  if (indexPanic >= panicFrames.length) {
    indexPanic = 0
  }

  panic.src = panicFrames[indexPanic ++]
  
  panicId = setTimeout(panicEffect, 100)
}

export const stopLifted = () => {
  clearTimeout(liftedId)
  clearTimeout(panicId)

  index = 0
  indexPanic = 0
  panicStarted = false

  // mouth.style.display = 'block'
  // eyes.style.display = 'block'
  panic.style.display = 'none'
}