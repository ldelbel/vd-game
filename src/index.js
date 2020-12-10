import 'phaser';

import { GameScene } from './scenes/gamescene';

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
      gravity: { x: -200 },
      enableBody: true,
    }
  },
  scene: GameScene
};

new Phaser.Game(config);