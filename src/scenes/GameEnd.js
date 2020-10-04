import Phaser from 'phaser'

export default class GameEnd extends Phaser.Scene {
	constructor() {
		super('GameEnd')
	}

	preload() {
		this.load.image("hive", "images/hive.png")
	}

	create() {
		this.cameras.main.setBackgroundColor(new Phaser.Display.Color(0,0,0))
		this.add.image(580, 30, 'hive').setScale(0.9).setOrigin(0,0)
		this.add.image(500, 50, 'hive').setOrigin(0,0)
		this.add.image(700, 45, 'hive').setOrigin(0,0)
		this.cursors = this.input.keyboard.createCursorKeys()
		this.add.text(125, 125, "SUCCESS!").setScale(4)

		this.add.text(125, 250, "You have delivered your swarm to safety, they found a lovely artisnal beekeeper who was willing\n to put you all up in a nice wooden boxes for the forseeable future.\n\nAll he asked in exchange was 60% of the fruits of your labour for the rest of your lives.\n\nBargain!")

		this.add.text(125, 400, "Thank you for playing this game. I hope you had fun.")
		this.add.text(125, 450, "Bee tips:\n - If you see a weary bee, put out a little sugar water for them nearby, it'll get them buzzing!\n - All it takes to help your local bees out is planting some pretty flowers in your garden.\n - Pesticides mess with bees' natural habits, if you can afford to buy pesticide-free honey, please do.\n - Bees are a major polinator, without them we'd have a hard time growing all kinds of crops so we\n   need to look after them if we can.")
	}
}
