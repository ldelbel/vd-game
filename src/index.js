import 'phaser';
import { GameScene } from './scenes/gamescene';
import 'phaser3-weapon-plugin/dist/WeaponPlugin.js';


const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1100,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
     enableBody: true,
     debug: false,
     gravity: 0
    }
  },
  scene: GameScene
};

const game = new Phaser.Game(config);
