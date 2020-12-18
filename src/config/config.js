import { GameScene } from '../scenes/game';
import {PreloaderScene} from '../scenes/preloader';
import {MenuScene} from '../scenes/menu';

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
  scene: [PreloaderScene, MenuScene, GameScene]
};

export default config;