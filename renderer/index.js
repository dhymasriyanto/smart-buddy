import { face } from "./face-animation.js"
import { breath } from "./breath-animation.js"
import { sleepTransition, stopSleeping } from "./sleep-animation.js"
import { getState } from "./state.js"


// Lets make some state
// i.e. : idle | sleeping | walking | lifted
import { currentState, setState } from "./state.js"

// Set animation recursively
setInterval(() => {
	if (currentState !== 'idle') return
	
	face()
}, 1500)

setInterval(() => {
	if (currentState !== 'idle') return
		
	breath()
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