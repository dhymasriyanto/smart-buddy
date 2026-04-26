import { blinkFrames } from "./frames.js"

const eyes = document.getElementById('eyes')
const mouth = document.getElementById('mouth')

// Here the blink animation
let blinkIndex = 0

const blink = () => {
	eyes.src = blinkFrames[blinkIndex++]
	
	if (blinkIndex >= blinkFrames.length) {
		blinkIndex = 0
		return
	}
	
	setTimeout(blink, 120)
}

export const face = () => {
	const randomEyes = Math.random()
	
	if (randomEyes < 0.2) {
		blink()
	} else if (randomEyes < 0.3) {
		// Will make eyes look like sinical
		eyes.src = 'assets/eyes_3.png'
	} else {
		// Will make the open mostly
		eyes.src = 'assets/eyes_4.png'
	}
	
	const randomMouth = Math.random()
	
	if (randomMouth < 0.2) {
		mouth.src = 'assets/mouth_1.png'
	} else if (randomMouth < 0.3) {
		mouth.src = 'assets/mouth_2.png'
	} else {
		mouth.src = 'assets/mouth_closed.png'
	}
}