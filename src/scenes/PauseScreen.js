import Phaser from 'phaser'

export default class PauseScreen extends Phaser.Scene {
	constructor() {
		super('PauseScreen')
		this.min_pause_duration = 100
		this.cursors = undefined
	}

	create() {
		this.cursors = this.input.keyboard.createCursorKeys()
		this.add.text(275, 250, "PAUSED").setScale(4)
	}

	unpause() {
		var last_paused = this.registry.get('last_paused')
		// don't un-pause too rapidly
		if (last_paused + this.min_pause_duration > this.time.now) return
		var key = this.registry.get('paused')
		if (key) {
			this.registry.set('paused', undefined)
			this.registry.set('last_unpaused', this.time.now)
			this.scene.resume(key)
			this.scene.stop()
		}
	}

  update() {
		if (this.cursors.space.isDown) {
			this.unpause()
		}
	}

}
