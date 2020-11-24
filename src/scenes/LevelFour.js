import Phaser from 'phaser'
import LevelOne from "./LevelOne.js"

export default class LevelFour extends LevelOne {
	constructor() {
		super(4)

		this.default_parts_to_add = 1
		this.bee_goal = 30
		this.doReset()
	}

	nextLevel() {
		return 'level5'
	}
}
