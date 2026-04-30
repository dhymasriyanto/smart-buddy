import { face } from "./face-animation.js";
import { breath } from "./breath-animation.js";
import { sleepTransition, stopSleeping } from "./sleep-animation.js";

// Lets make some state
// i.e. : idle | sleeping | walking | lifted
let state = 'idle'

// Set animation recursively
setInterval(() => {
	if (state !== 'idle') return
	
	face()
}, 1500)

setInterval(() => {
	if (state !== 'idle') return
		
	breath()
}, 5000)

// Mendengarkan Event
addEventListener('keydown', (e) => {
  // Cek jika ada Event dengan keydown 's' maka masuk ke dalam state sleeping
	if (e.key === 's') {
	  // Tandai state sekarang menjadi sleeping
		state = state == 'idle' ? 'sleeping' : 'idle'
		
		// Masuk ke dalam sleep transition
		if (state === 'sleeping') sleepTransition()
		else stopSleeping()
	}
})