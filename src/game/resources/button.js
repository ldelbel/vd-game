import Phaser from 'phaser';
import soundState from '../soundstate'

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.hover = this.scene.sound.add('hover', {volume: 0.5})

    this.add(this.button);

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetScene);
      if(soundState.soundOn === true) {
        this.hover.play();
      }
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);   
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}