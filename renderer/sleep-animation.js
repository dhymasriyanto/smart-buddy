import {
  sleepTransitionFrames,
  eyesSleepTransitionFrames,
  sleepSnoreInhaleFrames,
  sleepSnoreExhaleFrames,
} from './frames.js'
import { setPosition } from './utils.js'
import { currentState, getState, setState } from './state.js'

const body = document.getElementById('body')
const eyes = document.getElementById('eyes')
const mouth = document.getElementById('mouth')

// Set index awal 0
let index = 0,
  inhaleId = null,
  exhaleId = null,
  sleepTransitionId = null,
  // Set index untuk inhale dan exhale = 0
  indexInhale = 0,
  indexExhale = 0

export const sleepTransition = () => {
  if (getState() === 'idle') return

  // Jika index melebihi dari jumlah frame sleepTransitionFrames maka reset index menjadi 0 dan buat posisi body dalam keadaan tidur dan hilangkan mulut karena tidur menggunakan animasi mulut saat tidur sendiri
  // Set juga posisi mata di dibawah (y = 10) dan agak ke kiri (x = -1), lalu masuk ke state tidur dan keluar (return)
  if (index == sleepTransitionFrames.length) {
    index = 0
    // body.src = "assets/body_sleep_1.png"
    mouth.style.display = 'none'
    setPosition(eyes, -1, 10)
    sleep()
    return
  }
  // Body src juga ikut berubah frame sesuai index di frames.js, lalu kemudian increment index
  body.src = sleepTransitionFrames[index]

  // Menghapus display mouth pada image element karena akan menggunakan animasi baru
  mouth.style.display = 'none'

  // Membuat source image dari element mata sesuai dengan index eyesSleepTransitionFrames yang berlaku (akan berhubungan dengan timeout)
  eyes.src = eyesSleepTransitionFrames[index++]

  // Men-set posisi mata sesuai dengan index yang berlaku (semakin turun) [tipe element, x axis, y axis]
  setPosition(eyes, 0, index + 6)

  // setelah 120ms transition akan memanggil sleepTransition dan karena index sudah berubah nilai nya maka akan ke assets animasi yang selanjutnya sampai akhirnya di return (keluar)
  sleepTransitionId = setTimeout(sleepTransition, 120)
}

export const inhale = () => {
  if (currentState === 'idle') return
  if (indexInhale === 0) body.src = 'assets/body_sleep_1.png'

  // Pada saat penarikan nafas, animasi body sleep akan menggunakan body_sleep_2 (yaitu posisi badan seakan menarik ke atas tanpa wajah (yang nanti di animasikan di sini))
  if (indexInhale === 1) {
    setPosition(eyes, -1, 9)
    setPosition(mouth, 0, -1)
    body.src = 'assets/body_sleep_2.png'
  }

  // Lalu lakukan increment pada frame sleepSnoreInhaleFrames yang menjadi pengubah frame ketika fungsi ini dipanggil oleh setTimeout nantinya
  mouth.src = sleepSnoreInhaleFrames[indexInhale++]
  // Tampilkan display mouth karena tadi kita hapus
  mouth.style.display = 'block'

  // Jika index sudah mencapai index frame terakhir maka reset indexInhale dan lakukan exhale setTimeout 1000ms untuk holdBreath
  if (indexInhale >= sleepSnoreInhaleFrames.length) {
    indexInhale = 0

    // holdBreath
    exhaleId = setTimeout(exhale, 1000)

    return
  }

  inhaleId = setTimeout(inhale, 300)
}

export const exhale = () => {
  if (currentState === 'idle') return

  if (indexExhale == 1) {
    setPosition(eyes, -1, 11)
    setPosition(mouth, 0, 0)
    body.src = 'assets/body_sleep_1.png'
  }

  mouth.src = sleepSnoreExhaleFrames[indexExhale++]

  if (indexExhale >= sleepSnoreExhaleFrames.length) {
    indexExhale = 0

    inhaleId = setTimeout(inhale, 1000)
    return
  }

  exhaleId = setTimeout(exhale, 300)
}

export const sleep = () => {
  // We will make inhale and exhale logic
  // when in hale (the snore will have 4 animation) body sleep 1
  // when exhale also ( but the body will use body sleep 2)

  // Logika pertama yang akan kita lakukan adalah melakukan penarikan nafas
  // maka panggil inhale

  inhale()
}

export const stopSleeping = () => {
  // Kita harus bisa membuat sebuah kondisi dimana nantinya ketika di tekan 's' lagi maka animasi tidur akan berhenti

  clearTimeout(inhaleId)
  clearTimeout(exhaleId)
  clearTimeout(sleepTransitionId)

  inhaleId = null
  exhaleId = null
  sleepTransitionId = null
  index = 0
  indexInhale = 0
  indexExhale = 0

  body.src = 'assets/body_idle_1.png'
  if (mouth.style.display === 'none') mouth.style.display = 'block'
  mouth.src = 'assets/mouth_2.png'
  eyes.src = 'assets/eyes_4.png'

  setPosition(mouth, 0, 0)
  setPosition(eyes, 0, 0)

  setState('idle')
}
