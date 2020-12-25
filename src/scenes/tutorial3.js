import Button from '../game/resources/button'

export var Tutorial3 = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Tutorial3 ()
  {
      Phaser.Scene.call(this, { key: 'tutorial3' });
  },

  create: function ()
  {
    const panel = this.add.image(550,300, 'tutorial3').setScale(0.35);
    this.menuBtn = new Button(this, 300, 550, 'menu-btn', 'menu-btn', 'menuscene').setScale(0.35);
    this.prevBtn = new Button(this, 500, 500, 'prev-btn', 'prev-btn', 'tutorial2').setScale(0.35);
    this.nextBtn = new Button(this, 600, 500, 'next-btn', 'next-btn', 'tutorial4').setScale(0.35);
    this.skipBtn = new Button(this, 800, 550, 'skip-btn', 'skip-btn', 'gamescene').setScale(0.35);
  },

  doNextTutor: function ()
  {
    this.scene.start('tutorscene');
  },

  doStart: function ()
  {
      console.log('menuscene doStart was called!');
  this.scene.start('gamescene');
  }

});