import { face } from './face-animation.js'
import { breath } from './breath-animation.js'
import { sleepTransition, stopSleeping } from './sleep-animation.js'

// Lets make some state
// i.e. : idle | sleep_transition | walking | lifted
import { currentState, getState, setState } from './state.js'

// TODO
// Kalau bisa jangan pakai setInterval karena ketika semisal dalam sleep transition, dan dia masih terbaca idle, lalu kita klik s atau sleep, maka dia akan bug, karena menganggap ini adalah saatnya untuk melakukan perintah face atau breath

// Sepertinya aku harus ubah menjadi memakai listener di state, supaya dia ngabaca nya secara terus menerus, ga pake setInterval, jadi ngebaca nya via state yang sedang berlangsung.

let faceInterval = null,
  breathInterval = null,
  lastInteractionTime = Date.now()

export const startIdleAnimations = () => {
  stopIdleAnimations()

  // Set animation recursively
  faceInterval = setInterval(() => {
    if (currentState !== 'idle') return
    face()
  }, 1500)

  breathInterval = setInterval(() => {
    if (currentState !== 'idle') return
    breath()
  }, 5000)
}

export const stopIdleAnimations = () => {
  if (faceInterval) clearInterval(faceInterval)
  if (breathInterval) clearInterval(breathInterval)

  faceInterval = null
  breathInterval = null
}

export const resetIdleTimer = () => {}

// Mendengarkan Event
document.addEventListener('keydown', (e) => {
  // Cek jika ada Event dengan keydown 's' maka masuk ke dalam state sleeping
  if (e.key === 's') {
    // cek apakah state idle atau tidak
    const wasIdle = currentState === 'idle'

    // Tandai state sekarang menjadi sleeping jika idle, dan idle jika sleeping
    setState(wasIdle ? 'sleep_transition' : 'idle')

    // jika idle stop idle animasi dan jalan kan sleep transisi
    if (wasIdle) {
      stopIdleAnimations()
      sleepTransition()
    } else {
      // jika tidak idle, maka kebalikannya, dan jadikan last interaction terbaru
      stopSleeping()
      startIdleAnimations()
    }
    lastInteractionTime = Date.now()
  }
})

let isDragging = false,
  dragOffsetX = 0,
  dragOffsetY = 0

document.addEventListener('mousedown', (e) => {
  isDragging = true

  dragOffsetX = e.offsetX
  dragOffsetY = e.offsetY
})

document.addEventListener('mouseup', (e) => {
  isDragging = false

  lastInteractionTime = Date.now()
})

document.addEventListener('mousemove', (e) => {
  if (getState() !== 'idle') {
    if (getState() === 'sleep_transition') stopSleeping()
    // Harusnya disini start animasi panic.
    startIdleAnimations()
    // Harusnya lastInteractionTime itu di mouseup
    //lastInteractionTime = Date.now()
  }

  if (!isDragging) return
  if (!window.api) return

  window.api.moveWindow(e.screenX - dragOffsetX, e.screenY - dragOffsetY)
})

// Kita akan membuat sebuah estimasi perhitungan ketika idle state sudah melebihi 30 detik, maka otomatis masuk ke sleep_transtition
// dan ketika ada mouse hover ke character, maka otomatis wake up (idle state)

// Kita akan buat sebuah fungsi interval yang akan mengecek setiap 1 detik sekali dengan berlandaskan lastInteractionTime, dimana terakhir kali interaksi akan di simpan, lalu akan di cek dengan detik terakhir itu, apakah sudah lebih dari 30 detik maka lakukan transisi, nanti akan kita buat juga fungsi reset transisi sehingga lastInteractionTime akan menjadi terbaru sesuai dengan interaksi terakhir ntah mouseup atau pun yang lainnya.
setInterval(() => {
  let idleTime = Date.now() - lastInteractionTime

  if (idleTime > 5000) {
    if (currentState === 'idle') {
      setState('sleep_transition')
      stopIdleAnimations()
      sleepTransition()
      lastInteractionTime = Date.now()
    }
  }
}, 1000)

startIdleAnimations()
