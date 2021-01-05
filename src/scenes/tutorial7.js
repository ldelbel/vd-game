import Phaser from 'phaser';
import Button from '../game/resources/button';

const Tutorial7 = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Tutorial7() {
    Phaser.Scene.call(this, { key: 'tutorial7' });
  },

  create() {
    const panel = this.add.image(550, 300, 'tutorial7').setScale(0.35);
    this.menuBtn = new Button(this, 300, 550, 'menu-btn', 'menu-btn', 'menuscene').setScale(0.35);
    this.prevBtn = new Button(this, 500, 500, 'prev-btn', 'prev-btn', 'tutorial6').setScale(0.35);
    // this.nextBtn = new Button(this, 600, 500, 'next-btn', 'next-btn', 'tutorial8').setScale(0.35);
    this.skipBtn = new Button(this, 800, 550, 'skip-btn', 'skip-btn', 'gamescene').setScale(0.35);
  },
});

export default Tutorial7;