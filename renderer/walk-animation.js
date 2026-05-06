import { walkFrames } from './frames.js'
import { startIdleAnimations } from './index.js'
import { panicEffect, panicId } from './lifted-animation.js'
import { getState } from './state.js'
import { flipImage, resetAnimation } from './utils.js'

const body = document.getElementById('body')
const mouth = document.getElementById('mouth')
const eyes = document.getElementById('eyes')
const panic = document.getElementById('panic')

let index = 0,
  walkId = null,
  lastWalk = null,
  panicStarted = false,
  step = 10

export const walk = (lastWalkTime = null) => {
  if (getState() !== 'walking') return

  if (lastWalkTime !== null) {
    lastWalk = lastWalkTime
  }

  if (Date.now() - lastWalk > 3000 && !panicStarted) {
    panic.style.display = 'block'
    panicEffect()
    panicStarted = true
  }

  mouth.style.display = 'none'
  eyes.style.display = 'none'

 

  let winX = window.screenX


  // if (panicStarted) step += step
  

  // Tidak berhenti ketika melebihi layar
  window.api.walk(winX - step)

  console.log('winX', winX)
  console.log('window available widht', window.screen.availWidth)

  
  if (winX < 0 || winX > window.screen.availWidth - body.offsetWidth) {
    stopWalking()
    startIdleAnimations()
    return
  }

  // NOTES ;; bug ketika sampai ujung dari layar, ketika walk animation berjalna ada bug... dimaan assets nya berantakan dan bingung mau kemana

  
  
  if (index >= walkFrames.length) {
    index = 0
  }
  body.src = walkFrames[index++]

  walkId = setTimeout(walk, 150)
}

export const startWalking = () => {
  if (Math.random() < 0.7) {
     flipImage(body)
     flipImage(panic)
     step = -step
   }
  
  walk(Date.now())
}

export  const stopWalking = () => {
  if (!walkId) return
  clearTimeout(walkId)
  clearTimeout(panicId)

  if (step < 0) {
    flipImage(body)
    flipImage(panic)
    step = 10
  }

  walkId = null
  lastWalk = null
  index = 0
  panicStarted = false
  

  resetAnimation()
  
}
