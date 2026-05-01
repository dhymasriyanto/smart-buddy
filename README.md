# Smart Buddy
## Smart idle buddy for your moody and productivity

Smart Buddy is a desktop companion app that lives on your screen, providing several feature for your productivity.

### Features
- Animated character (WIP and more animation will come)
- Pomodoro Timer (Coming soon)
- Random quotes (Coming soon)
- Simple chat bot with the animated character (Coming soon)
- Feed the animated character (Coming soon)
- And many more feaures will come..

### Installation
- Clone this repo.
- Run `npm install`
- For dev, start the app using `npm start`

### Project Structure
- `main/main.js` - Electron main process that creates the application window
- `renderer/` - Contains all frontend JavaScript for animations and interactions
- `index.html` - Main HTML file that defines the character structure
- `assets/` - Contains all images for the character animations
- `preload/` - Electron preload script for context bridging

### Technologies Used
- [Electron](https://www.electronjs.org/) - Framework for building desktop applications with web technologies
- JavaScript - Programming language for all application logic
- HTML/CSS - Structure and styling of the character interface

### Contributing
We welcome contributions to improve Smart Buddy! Here's how you can help:

1. Fork the repository
2. Create a new feature branch
3. Make your changes
4. Commit your changes with descriptive messages
5. Push to your fork
6. Create a pull request

If you are an artist and want to create new character design feel free to contribute!

### Assets/Frames Adjustment

The animation system in Smart Buddy uses frame sequences defined in the `renderer/frames.js` file. Each animation consists of a series of image assets that are cycled through to create the illusion of movement.

**Available frame sequences:**
- `blinkFrames`: Controls eye blinking animation with 4 frames
- `breathFrames`: Creates breathing effect with 8 frames that expand and contract
- `sleepTransitionFrames`: 4 frames for transitioning to sleep mode
- `eyesSleepTransitionFrames`: 4 frames for eye movement when falling asleep
- `sleepSnoreInhaleFrames`: 4 frames for the inhale portion of snoring
- `sleepSnoreExhaleFrames`: 4 frames for the exhale portion of snoring

**To modify or add animations:**
1. Add new image assets to the `assets/` directory
2. Update the corresponding frame array in `renderer/frames.js`

**Image requirements:**
- All character images should be 256x256 pixels
- Use PNG format with transparency
- Name images according to their function and sequence order

### License
This project is licensed under the ISC License - see the LICENSE file for details.
