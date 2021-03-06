import Phaser from 'phaser';
import Button from '../game/resources/button';

const Tutorial1 = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Tutorial1() {
    Phaser.Scene.call(this, { key: 'tutorial1' });
  },

  create() {
    const panel = this.add.image(550, 300, 'tutorial1').setScale(0.35);
    this.menuBtn = new Button(this, 300, 550, 'menu-btn', 'menu-btn', 'menuscene').setScale(0.35);
    this.nextBtn = new Button(this, 600, 500, 'next-btn', 'next-btn', 'tutorial2').setScale(0.35);
    this.skipBtn = new Button(this, 800, 550, 'skip-btn', 'skip-btn', 'gamescene').setScale(0.35);
  },
});

export default Tutorial1;