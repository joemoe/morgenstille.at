export default class LandScene extends Phaser.Scene {
	constructor() {
		super('land');

		this.player = undefined;
		this.cursors = undefined;

		this.titlebar = undefined;
		this.action = undefined;
		this.actionLink = undefined;
	}

	preload() {
		this.load.image('player', 'assets/player-1.png');
		this.load.image('goal', 'assets/goal-1.png');
	}

	create() {
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
	}

	update() {
		if(this.cursors.left.isDown) {
			this.player.setVelocityX(-160);
		} else if(this.cursors.right.isDown) {
			this.player.setVelocityX(160);
		} else {
			this.player.setVelocityX(0);
		}

		if(this.cursors.up.isDown) {
			this.player.setVelocityY(-160);
		} else if(this.cursors.down.isDown) {
			this.player.setVelocityY(160);
		} else {
			this.player.setVelocityY(0);
		}

		if(false && !this.player.isColliding) {
			this.hideTitlebar();
			this.action = undefined;
		}
	}

	createGoals() {
		const goals = this.physics.add.staticGroup();

		const moser = goals.create(200, 100, 'goal');
		moser.setData('type', 'link');
		moser.setData('title', 'Father & Son');
		moser.setData('link', 'https://moser.wtf');
		moser.body.setCircle(50);
		
		const joemoe = goals.create(300, 300, 'goal');
		joemoe.setData('type', 'link');
		joemoe.setData('title', 'Me is Joemoe');
		joemoe.setData('link', 'https://joemoe.at');
		joemoe.body.rotation = 284;
		joemoe.body.setCircle(50);

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

}