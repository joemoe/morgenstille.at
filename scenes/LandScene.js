export default class LandScene extends Phaser.Scene {
	constructor() {
		super('land');

		this.player = undefined;
		this.cursors = undefined;

		this.titlebar = undefined;
		this.action = undefined;
		this.actionLink = undefined;

		this.playerTarget = undefined;
		this.lastDist = 10000000;
	}

	preload() {
		this.load.image('player', 'assets/player-1.png');
		this.load.image('goal', 'assets/goal-1.png');
	}

	create() {

	    this.cameras.main.setBounds(0, 0, 2000, 2000);
	    this.physics.world.setBounds(0, 0, 2000, 2000);

		const goals = this.createGoals();
		this.player = this.createPlayer();

		this.titlebar = this.createTitlebar();
		this.hideTitlebar();

		this.make.text({
			x: 10,
			y: 10,
			align: 'left',
			text: '//MORGENSTILLE.AT',
			style: {
				color: '#fdb833'
			}
		});

		this.physics.add.collider(this.player, goals, this.collideGoal, null, this);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.input.keyboard.on('keydown', this.executeAction, this);

		this.input.on('pointerdown', this.setPlayerGoal, this);

		this.cameras.main.startFollow(this.player);
	}

	update() {
		let velX = 0;
		let velY = 0;

		if(this.cursors.left.isDown) {
			velX = -160;
		} else if(this.cursors.right.isDown) {
			velX = 160;
		}

		if(this.cursors.up.isDown) {
			velY = -160;
		} else if(this.cursors.down.isDown) {
			velY = 160;
		}

		if(velX != 0 && velY != 0) {
			let sped = Math.sqrt(velX * velX + velY * velY);
			velX = velX / sped * 160;
			velY = velY / sped * 160;
		}

		if(velX != 0 || velY != 0) { 
			this.playerTarget =  null;
			this.lastDist = 10000000;
		} else if(this.playerTarget) {
			let deltaX = this.playerTarget.x - this.player.getCenter().x;
			let deltaY = this.playerTarget.y - this.player.getCenter().y;
			let deltaDist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

			if(this.lastDist - deltaDist < 1) {
				this.playerTarget = null;
				this.lastDist = 10000000;
			} else {
				velX = deltaX / deltaDist * 160;
				velY = deltaY / deltaDist * 160;
				this.lastDist = deltaDist;
			}
		}

		this.player.setVelocity(velX, velY);

		if(false && !this.player.isColliding) {
			this.hideTitlebar();
			this.action = undefined;
		}
	}

	createGoals() {
		const goals = this.physics.add.staticGroup();

		const moser = goals.create(400, 400, 'goal');
		moser.setData('type', 'link');
		moser.setData('title', 'Father & Son');
		moser.setData('link', 'https://moser.wtf');
		moser.setRotation(1);
		moser.body.setCircle(50);
		
		const joemoe = goals.create(1600, 300, 'goal');
		joemoe.setData('type', 'link');
		joemoe.setData('title', 'Me is Joemoe');
		joemoe.setData('link', 'https://joemoe.at');
		joemoe.setRotation(2);
		joemoe.body.setCircle(50);

		const crate = goals.create(800, 700, 'goal');
		crate.setData('type', 'link');
		crate.setData('title', 'Managing products at Crate.io');
		crate.setData('link', 'https://crate.io');
		crate.body.setCircle(50);
		crate.setRotation(3);

		const insta = goals.create(1700, 800, 'goal');
		insta.setData('type', 'link');
		insta.setData('title', 'Impressions of a live // IG');
		insta.setData('link', 'https://instagram.com/joemoe');
		insta.body.setCircle(50);
		insta.setRotation(4);

		const twitter = goals.create(200, 1700, 'goal');
		twitter.setData('type', 'link');
		twitter.setData('title', 'Wisdom // Twtr');
		twitter.setData('link', 'https://twitter.com/joemoeat');
		twitter.body.setCircle(50);
		twitter.setRotation(5);

		const github = goals.create(1200, 1200, 'goal');
		github.setData('type', 'link');
		github.setData('title', 'Github');
		github.setData('link', 'https://github.com/joemoe');
		github.body.setCircle(50);
		github.setRotation(6);

		return goals;
	}

	createPlayer() {
		const player = this.physics.add.image(200, 200, 'player');
		player.setCollideWorldBounds(true);
		player.setCircle(24);
		return player;
	}

	createTitlebar() {
		const titlebar = this.make.text({
			x: 100,
			y: 10,
			align: 'center',
			text: '//MORGENSTILLE.AT',
			style: {
				color: '#fdb833'
			}
		});
		return titlebar;
	}

	collideGoal(player, goal) {
		var b = goal.getBounds();
		this.showTitlebar(goal.getData('title'), b.x + b.width / 2, b.y);
		this.action = goal.getData('type');
		this.actionLink = goal.getData('link');
	}

	showTitlebar(text, x, y) {
		this.titlebar.setVisible(true);
		this.titlebar.setText(text);
		this.titlebar.setPosition(x - this.titlebar.width / 2, y - this.titlebar.height);	}

	hideTitlebar() {
		this.titlebar.setVisible(false);
	}

	executeAction(obj) {
		if(obj.keyCode == 32 && this.action == 'link') {
			window.open(this.actionLink);
		}
	}

	setPlayerGoal(obj) {
		this.playerTarget = {
			x: obj.x + this.cameras.main.scrollX,
			y: obj.y + this.cameras.main.scrollY
		}
	}

}