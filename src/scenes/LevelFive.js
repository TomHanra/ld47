import Phaser from 'phaser'
import LevelOne from "./LevelOne.js"

export default class LevelFour extends LevelOne {
	constructor() {
		super(5)

		this.default_parts_to_add = 0
		this.bee_goal = 60
		this.doReset()
	}

	nextLevel() {
		return 'level1'
	}
}
