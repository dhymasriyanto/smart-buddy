import { walkFrames } from './frames.js'
import { panicEffect } from './lifted-animation.js'
import { getState } from './state.js'

const body = document.getElementById('body')
const mouth = document.getElementById('mouth')
const eyes = document.getElementById('eyes')
const panic = document.getElementById('panic')

let index = 0,
  walkId,
  lastWalk,
  panicStarted = false

export const walk = (lastWalkTime = null) => {
  if (getState() !== 'walking') return

  if (lastWalkTime !== null) {
    lastWalk = lastWalkTime
  }

  if (Date.now() - lastWalk > 3000 && !panicStarted) {
    console.log('tst')
    panic.style.display = 'block'
    panicEffect()
    panicStarted = true
  }

  mouth.style.display = 'none'
  eyes.style.display = 'none'

  if (index >= walkFrames.length) {
    index = 0
  }
  body.src = walkFrames[index++]

  walkId = setTimeout(walk, 200)
}
