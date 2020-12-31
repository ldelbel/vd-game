import Phaser from 'phaser';

export default class MenuButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, key1).setInteractive();
    this.click = this.scene.sound.add('click');
    this.hover = this.scene.sound.add('hover', {volume: 0.5})

    this.add(this.button);

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetScene);
      this.click.play();
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);   
      this.hover.play();   
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });

    this.scene.add.existing(this);
  }
}