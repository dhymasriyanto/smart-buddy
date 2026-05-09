import { walkFrames } from './frames.js'
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
  step = 10,
  remainingSteps = 60 + Math.random() * 800 // me random angka

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

  let winX = window.screenX //1026

  // karena pertambahan itu 10, dia akan melewati satu kali pemanggilan, dan itu membuat nilai winX menjadi kecil dari sama denagn 0 atau lebih besar dari sma dengan screen.availWidth - body.offsetWidth
  // bagaimana caranya supaya dia berhenti tepat sebelum winX melebihi edge

  // jadi cara nya adalah dia harus ngebaca posisi X setelahnya
  let nextX = winX - step

  // Apakah stelah nya nanti itu lebih kecil dari 0 atau
  // setelahnya itu (1023 + 10 ) = 1033 +256 =  89  >= 1280
  if (nextX <= 0 || nextX + body.offsetWidth >= window.screen.availWidth) {
    // disini dia akan pasti ke arah sebaliknya, meski di start walking itu kita random, karena dia akan slealu kesini jika lebih besar dari pinggiran layar yang kita tentukan sammpai akhirnya ke arah seblaiknya.
    startWalking()

    // pertanyannya: bagus dia berhenti di pojok, llu nanti berjalan random lagi? tapi harus ke arah sebaliknya, atau, dia langsung putar balik jika di pojok? nanti kita bisa buatkan semacam jarak langkah random yang ia tempuh.
    return
  }

  window.api.walk(nextX)

  // NOTES ;; bug ketika sampai ujung dari layar, ketika walk animation berjalna ada bug... dimaan assets nya berantakan dan bingung mau kemana
  if (index >= walkFrames.length) {
    index = 0
  }


  body.src = walkFrames[index++]

  remainingSteps -= Math.abs(step)
  
  if (remainingSteps <= 0) {
    stopWalking()
    return
  }

  walkId = setTimeout(walk, 150)
}

export const startWalking = () => {
  if (Math.random() < 0.5) {
    /// kalau dia di pojok , dan dia malah ke arah pojoknya, itu akan ngebuat dia flipped dan mala stopped nanti
    //
    flipImage(body)
    flipImage(panic)
    // karena dari step itu udah pasti menambhakn atau mengurangi posisi winX
    step = -step
  }

  walk(Date.now())
}

export const stopWalking = () => {
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
  remainingSteps = 60 + Math.random() * 800

  resetAnimation()
}
