import Phaser from 'phaser'

import LevelOne from './scenes/LevelOne'
import LevelTwo from './scenes/LevelTwo'
import LevelThree from './scenes/LevelThree'
import LevelFour from './scenes/LevelFour'
import LevelFive from './scenes/LevelFive'
import PauseScreen from './scenes/PauseScreen'

const config = {
	type: Phaser.AUTO,
	width: 1024,
	height: 600,
	physics: {
		default: 'arcade'
	},
	parent:"game",
	scene: [LevelOne, LevelTwo, LevelThree, LevelFour, LevelFive, PauseScreen]
}

export default new Phaser.Game(config)
