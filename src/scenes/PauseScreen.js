import Phaser from 'phaser'
import LevelOne from "./LevelOne.js"

export default class PauseScreen extends Phaser.Scene {
	constructor() {
		super('PauseScreen')

		this.cursor = undefined
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys()
		this.add.text(275, 250, "PAUSED").setScale(4)
	}

  update() {
		if (this.cursors.space.isDown) {
			var key = this.registry.get('paused')
			this.scene.resume(key)
			this.scene.stop()
		}
	}

}
