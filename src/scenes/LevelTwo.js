import Phaser from 'phaser'
import LevelOne from "./LevelOne.js"

export default class LevelTwo extends LevelOne {
	constructor() {
		super(2)
		this.default_parts_to_add = 4
		this.bee_goal = 30
		this.doReset()
	}

	nextLevel() {
		return 'level3'
	}
}
