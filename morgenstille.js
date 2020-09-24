import DemoScene from './scenes/DemoScene.js'
import LandScene from './scenes/LandScene.js'


const colors = [
	'#B1740F'
	,	'#FFD07B'
	,	'#fdb833'
	,	'#296EB4'
	,	'#1789FC'
];

const config = {
	colors: colors,
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: '#296eb4',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [LandScene, DemoScene]
}

export default new Phaser.Game(config)