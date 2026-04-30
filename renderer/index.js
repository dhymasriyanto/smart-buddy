import { face } from "./face-animation.js"
import { breath } from "./breath-animation.js"
import { sleepTransition, stopSleeping } from "./sleep-animation.js"
import { getState } from "./state.js"


// Lets make some state
// i.e. : idle | sleeping | walking | lifted
import { currentState, setState } from "./state.js"


// TODO
// Kalau bisa jangan pakai setInterval karena ketika semisal dalam sleep transition, dan dia masih terbaca idle, lalu kita klik s atau sleep, maka dia akan bug, karena menganggap ini adalah saatnya untuk melakukan perintah face atau breath

// Sepertinya aku harus ubah menjadi memakai listener di state, supaya dia ngabaca nya secara terus menerus, ga pake setInterval, jadi ngebaca nya via state yang sedang berlangsung.


// Set animation recursively
setInterval(() => {
	if (currentState === 'idle') face()
}, 1500)

setInterval(() => {
	if (currentState === 'idle') breath()
}, 5000)

// Mendengarkan Event
addEventListener('keydown', (e) => {
  // Cek jika ada Event dengan keydown 's' maka masuk ke dalam state sleeping
	if (e.key === 's') {
	  // Tandai state sekarang menjadi sleeping
		setState(currentState === 'idle' ? 'sleep_transition' : 'idle')
		
		// Masuk ke dalam sleep transition
		if (currentState === 'sleep_transition') sleepTransition()
    else {
      stopSleeping()
    }
	}
})