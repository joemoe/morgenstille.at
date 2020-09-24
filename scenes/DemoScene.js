export default class DemoScene extends Phaser.Scene {
	constructor() {
		super('demo');
	}

	preload() {

	}

	create() {
		var text = this.make.text({
			x: 10,
			y: 10,
			text: '//MORGENSTILLE.AT',
			fill: '#1789fc'
		});
	}
}