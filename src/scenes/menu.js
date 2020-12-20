import Button from '../game/resources/button'

export var MenuScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function MenuScene ()
  {
      Phaser.Scene.call(this, { key: 'menuscene' });
  },

  preload: function ()
  {
  },

  create: function ()
  {
    this.btnhelp = new Button(this, 550, 300, 'btn', 'btn1', 'Game', 'gamescene')

    this.btnhelp.setInteractive();

    console.log(this.btnhelp)

  console.log('create is ready');
  },

  doTutor: function ()
  {
      console.log('doTutor was called!');
  this.scene.start('tutorscene');
  },

doStart: function ()
  {
      console.log('menuscene doStart was called!');
  this.scene.start('gamescene');
  }

});