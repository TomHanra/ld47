import Phaser from 'phaser'

export default class LevelOne extends Phaser.Scene {
	constructor(level_id = 1) {
		super('level'+ level_id)
		this.level_id = level_id
		this.cursor = undefined
		this.pause_delay = 100
		this.default_parts_to_add = 6
		this.bee_goal = 30
		this.move_delay = 100
		this.wallMap = []
		this.bee_start_x = undefined
		this.bee_start_y = undefined
		this.doReset()
	}

	doReset() {
		this.bee_speed = 15
		this.x_direction = 1
		this.y_direction = 0
		this.parts_to_add = this.default_parts_to_add
		if (this.swarm) {
			this.parts_to_add = this.swarm.length
		}
		if (this.bee) {
			this.bee.x = this.bee_start_x
			this.bee.y = this.bee_start_y
			this.bee.angle = 0
			for(var i=0; i < this.swarm.length; i++) {
				this.swarm[i].destroy()
			}
		}
		this.swarm = []
	}

	preload() {
		// Pre-load assets
    this.load.image('bee', 'images/bee.png')
    this.load.image('wall-1', 'images/wall1.png')
    this.load.image('wall-2', 'images/wall2.png')
    this.load.image('wall-3', 'images/wall3.png')
    this.load.image('wall-4', 'images/wall4.png')
    this.load.image('wall-5', 'images/wall5.png')
    this.load.image('wall-6', 'images/wall6.png')
		this.load.image('flower-1', 'images/flower1.png')
		this.load.image('flower-2', 'images/flower2.png')
		this.load.image('flower-3', 'images/flower3.png')
		this.load.image('flower-4', 'images/flower4.png')
		this.load.image('btn-up', 'images/up.png')
		this.load.image('btn-down', 'images/down.png')
		this.load.image('btn-left', 'images/left.png')
		this.load.image('btn-right', 'images/right.png')
		this.load.image('map-'+this.level_id, 'levels/level'+ this.level_id + '.png')
		this.load.audio("beep", "sfx/beep.wav")
		this.load.audio("death", "sfx/death.wav")
		this.load.audio("next_level", "sfx/next_level.wav")
  }

	updateLevelLabel() {
		this.level_label.setText('Level ' + this.level_id + ' / 5')
	}

	updateBeeTracker() {
		this.bee_tracker.setText('Bees: ' + this.getBeeCount() + ' / ' + this.bee_goal)
	}

	getBeeCount() {
		return this.swarm.length + 1
	}

	fail() {
		this.death.play()
		this.doReset()
	}

	createMenu() {
		// add interface
		this.add.rectangle(800, 0, 224, 600, new Phaser.Display.Color(0,0,0)).setOrigin(0,0)
		this.level_label = this.add.text(825, 25, "").setScale(1.5)
		this.bee_tracker = this.add.text(825, 75, "").setScale(1.5)

		this.add.text(825, 165, "Keyboard:  W,A,S,D")
		this.add.text(825, 195, "                 or ↑←↓→")
		this.add.text(825, 220, "Pause: <space>")

		this.left = this.add.image(800, 400, "btn-left").setScale(1).setOrigin(0,0).setInteractive()
		this.down = this.add.image(860, 500, "btn-down").setScale(1).setOrigin(0,0).setInteractive()
		this.right = this.add.image(920, 400, "btn-right").setScale(1).setOrigin(0,0).setInteractive()
		this.up = this.add.image(860, 300, "btn-up").setScale(1).setOrigin(0,0).setInteractive()
		var self = this
		this.left.on('pointerdown', () => self.goLeft() )
		this.right.on('pointerdown', () => self.goRight() )
		this.down.on('pointerdown', () => self.goDown() )
		this.up.on('pointerdown', () => self.goUp() )
	}

  create() {
		this.cameras.main.setBackgroundColor(new Phaser.Display.Color(50,100,10))
		this.createMenu()
		this.beep = this.sound.add('beep')
		this.death = this.sound.add('death')
		this.success = this.sound.add('next_level')

		this.walls = this.physics.add.staticGroup()
		if (this.wallMap.length == 0) {
			for (var i = 0; i < 80; i++) {
				for (var j = 0; j < 60; j++) {
					var pixel_value = this.textures.getPixel(i, j, 'map-'+this.level_id)
					if (!pixel_value || pixel_value.g > 200) {
						var idx = Math.ceil(Math.random()*6)
						if (!this.wallMap[idx]) this.wallMap[idx] = []
						this.wallMap[idx].push([i, j])
					} else if (pixel_value.r == 150) {
						this.bee_start_x = i*10
						this.bee_start_y = j*10
					}
				}
			}
		}
		var self = this
		for (const idx of this.wallMap.keys()) {
			if (this.wallMap[idx]) {
				this.wallMap[idx].forEach(pair => this.walls.create(pair[0]*10, pair[1]*10, 'wall-' + idx))
			}
		}
		this.bee = this.physics.add.sprite(this.bee_start_x, this.bee_start_y, 'bee').setScale(1.5)

		var self = this
		this.physics.add.collider(this.bee, this.walls, function(_bee, _wall) {
			self.fail()
		})

		this.cursors = this.input.keyboard.createCursorKeys()
		this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

		this.addFlower()
		this.moveBee()
		this.updateBeeTracker()
		this.updateLevelLabel()
	}

	goUp() {
		if (this.y_direction == 0) {
			this.y_direction = -1
			this.x_direction = 0
			this.bee.angle = -90
		}
	}

	goDown() {
		if (this.y_direction == 0) {
			this.y_direction = 1
			this.x_direction = 0
			this.bee.angle = 90
		}
	}

	goLeft() {
		if (this.x_direction == 0) {
			this.x_direction = -1
			this.y_direction = 0
			this.bee.angle = 180
		}
	}

	goRight() {
		if (this.x_direction == 0) {
			this.x_direction = 1
			this.y_direction = 0
			this.bee.angle = 0
		}
	}

	doPause() {
		var last_paused = this.registry.get('last_paused')
		// don't allow pause-spam
		if (last_paused && last_paused + this.pause_delay > this.time.now) return;
		var last_unpaused = this.registry.get('last_unpaused')
		if (last_unpaused && last_unpaused + this.pause_delay > this.time.now) return;
		this.scene.pause()
		this.registry.set('paused', this.scene.key)
		this.registry.set('last_paused', this.time.now)
		this.scene.launch('PauseScreen')
	}

	update() {
		if (this.getBeeCount() >= this.bee_goal) {
			this.success.play()
			this.doReset()
			this.scene.start(this.nextLevel())
		}
		if ((this.leftKey.isDown || this.cursors.left.isDown)) {
			this.goLeft()
		}
		if ( (this.rightKey.isDown || this.cursors.right.isDown)) {
			this.goRight()
		}
		if ( (this.upKey.isDown || this.cursors.up.isDown)) {
			this.goUp()
		}
		if ( (this.downKey.isDown || this.cursors.down.isDown)) {
			this.goDown()
		}
		if (this.cursors.space.isDown) {
			this.doPause()
		}
		this.moveBee()
	}

	moveBee() {
		if (this.last_move + this.move_delay > this.time.now) return
		// move the bee parts
		var old_x = this.bee.x
		var old_y = this.bee.y
		var old_angle = this.bee.angle
		this.bee.x += this.x_direction * this.bee_speed
		this.bee.y += this.y_direction * this.bee_speed
		for (var i=0; i < this.swarm.length; i++) {
			let old_old_x = this.swarm[i].x
			let old_old_y = this.swarm[i].y
			let old_old_angle = this.swarm[i].angle
			this.swarm[i].x = old_x
			this.swarm[i].y = old_y
			this.swarm[i].angle = old_angle
			old_x = old_old_x
			old_y = old_old_y
			old_angle = old_old_angle
		}
		if (this.parts_to_add > 0) {
			var tail_x = this.getTail().x
			var tail_y = this.getTail().y
			var tail_angle = this.getTail().angle
			var new_part = this.physics.add.sprite(tail_x - this.x_direction * this.bee.width, tail_y - this.y_direction*this.bee.height, 'bee')
			new_part.angle = tail_angle
			this.swarm.push(new_part)
			self = this
			new_part.collider = this.physics.add.collider(this.bee, new_part, function(_bee, _new_part) {
				if(self.parts_to_add <= 0) {
					self.fail()
				}
			})
			this.updateBeeTracker()
			this.parts_to_add--
		}
		this.last_move = this.time.now
	}

	getTail() {
		if (this.swarm.length == 0) {
			return this.bee
		}
		return this.swarm[this.swarm.length-1]
	}

	addFlower() {
		var x = Math.floor(Math.random() * 800)
		var y = Math.floor(Math.random() * 600)
		while(!this.spawnable(x, y)) {
			x = Math.floor(Math.random() * 800)
			y = Math.floor(Math.random() * 600)
		}
		this.flower = this.physics.add.sprite(x, y, 'flower-' + Math.ceil(Math.random()*4)).setScale(Math.random() + 1.5)
		var self = this
		this.physics.add.collider(this.bee, this.flower, function(_bee, _flower) {
			_flower.destroy()
			self.beep.play()
			self.parts_to_add++
			self.addFlower()
		})
		this.time.addEvent({
			delay: 15000,
			callback: this.cleanUpFlower,
			callbackScope: this,
			args: [this.flower]
		})
	}

	cleanUpFlower(flower) {
		if (flower.active) {
			flower.destroy()
			this.addFlower()
		}
	}

	spawnable(x, y) {
		var range = 10
		// check surrounding area is safe too
		if (x <=range || x >= 800-range || y <= range || y >= 600 - range) return false;
		var spawnable = true;
		for (var i = x - range; i < x + range; i++) {
			for (var j = y - range; j < y + range; j++) {
				spawnable &= this.textures.getPixel(Math.floor(i/10),Math.floor(j/10),'map-'+this.level_id).g < 255
			}
		}
		return spawnable
	}

	nextLevel() {
		return 'level2'
	}
}
