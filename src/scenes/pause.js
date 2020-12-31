import Button from '../game/resources/button'

export var Pause = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Pause ()
  {
      Phaser.Scene.call(this, { key: 'pause' });
  },

  create: function ()
  {
    this.unpauseGame = () => {
      this.scene.resume('gamescene');
      this.scene.stop('pause');
    }

    this.input.keyboard.on('keydown_P', this.unpauseGame, this);
  },

});