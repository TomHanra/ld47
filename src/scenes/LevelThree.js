import Phaser from 'phaser'
import LevelOne from "./LevelOne.js"

export default class LevelThree extends LevelOne {
	constructor() {
		super(3)

		this.default_parts_to_add = 2
		this.bee_goal = 15
		this.doReset()
	}

	nextLevel() {
		return 'level4'
	}
}
