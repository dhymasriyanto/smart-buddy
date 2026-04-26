import { face } from "./face-animation.js";
import { breath } from "./breath-animation.js";
import { sleep, sleepTransition } from "./sleep-animation.js";

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

addEventListener('keydown', (e) => {
	if (e.key === 's') {
		state = 'sleeping'
		
		sleepTransition()
		setInterval(sleep, 2000)
	}
})