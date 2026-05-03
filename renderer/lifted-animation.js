import { liftedFrames } from './frames.js'
import { getState } from './state.js'

const body = document.getElementById('body')
const mouth = document.getElementById('mouth')
const eyes = document.getElementById('eyes')
const panic = document.getElementById('panic')

let index = 0

export const lifted = () => {
  if (getState() !== 'lifted') return

  mouth.style.display = 'none'
  eyes.style.display = 'none'
  
  if (index >= liftedFrames.length) {
    index = 0
  }
  
  body.src = liftedFrames[index ++]
  setTimeout(lifted, 100)
}