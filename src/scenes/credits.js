import Button from '../game/resources/button';

export var Credits = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Credits() {
    Phaser.Scene.call(this, { key: 'creditsscene' });
  },

  create() {
    const panel = this.add.image(550, 300, 'credits-panel').setScale(0.35);
    const menuBtn = new Button(this, 400, 550, 'menu-btn', 'menu-btn', 'menuscene').setScale(0.35);
  },


});