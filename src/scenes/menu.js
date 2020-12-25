import Button from '../game/resources/button'

export var MenuScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function MenuScene ()
  {
      Phaser.Scene.call(this, { key: 'menuscene' });
  },

  create: function ()
  {
    const panel = this.add.image(550,300, 'menu-panel').setScale(0.35)
    this.playBtn = new Button(this, 550, 250, 'play-btn', 'play-btn-h', 'tutorial1').setScale(0.35)
    this.optionsBtn = new Button(this, 550, 300, 'options-btn', 'options-btn-h', 'gamescene').setScale(0.35)
    this.leaderBtn = new Button(this, 550, 350, 'leader-btn', 'leader-btn-h', 'gamescene').setScale(0.35)
    this.creditsBtn = new Button(this, 550, 400, 'credits-btn', 'credits-btn-h', 'gamescene').setScale(0.35)
  },
});