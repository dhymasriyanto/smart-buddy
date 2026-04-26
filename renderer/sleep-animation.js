import { sleepTransitionFrames, eyesSleepTransitionFrames, sleepSnoreInhaleFrames, sleepSnoreExhaleFrames } from "./frames.js"
import { setPosition } from "./utils.js"

const body = document.getElementById('body')
const eyes = document.getElementById('eyes')
const mouth = document.getElementById('mouth')

let index = 0

export const sleepTransition = () => {
	mouth.style.display = 'none'
	
	eyes.src = eyesSleepTransitionFrames[index]
	setPosition(eyes, 0, index + 6)
	
	body.src = sleepTransitionFrames[index++]
	
	if (index >= sleepTransitionFrames.length ) {
		index = 0
		body.src = 'assets/body_sleep_1.png'
		mouth.style.display = 'block'
		setPosition(eyes, -1, 10)
		sleep()
		return
	}
	
	setTimeout(sleepTransition, 120)
}

let indexInhale, indexExhale = 0

export const inhale = () => {
	
	body.src = 'assets/body_sleep_2.png'
	
	// let delay = 300
	
	mouth.src = sleepSnoreInhaleFrames[indexInhale++]
	
	if (indexInhale >= sleepSnoreInhaleFrames.length) {
		indexInhale = 0
		return
	}
	
	if (indexInhale === 4) delay = 1000
	
	
}

export const exhale = () => {
	body.src = 'assets/body_sleep_2.png'
	
	mouth.src = sleepSnoreExhaleFrames[indexExhale++]
	
	// let delay = 300
	
	if (indexExhale >= sleepSnoreExhaleFrames.length) {
		indexExhale = 0
		return
	}
	
	if (indexExhale === 4) delay = 1000
	
}

export const holdBreath = () => {
	
	
	setTimeout(holdBreath, 1000)
}

export const sleep = () => {
	// We will make inhale and exhale logic
	// when in hale (the snore will have 4 animation) body sleep 1
	// when exhale also ( but the body will use body sleep 2)
	
}