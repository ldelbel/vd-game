import Phaser from 'phaser';

const Pause = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Pause() {
    Phaser.Scene.call(this, { key: 'pause' });
  },

  create() {
    this.unpauseGame = () => {
      this.scene.resume('gamescene');
      this.scene.stop('pause');
    };

    this.input.keyboard.on('keydown_P', this.unpauseGame, this);
  },

});

export default Pause;