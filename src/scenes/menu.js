import Button from '../game/resources/button'
import Model from '../model'

export var MenuScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function MenuScene ()
  {
      Phaser.Scene.call(this, { key: 'menuscene' });
  },

  create: function ()
  {
    const panel = this.add.image(550,300, 'menu-panel').setScale(0.35);
    this.playBtn = new Button(this, 550, 250, 'play-btn', 'play-btn-h', 'tutorial1').setScale(0.35);
    this.optionsBtn = new Button(this, 550, 300, 'options-btn', 'options-btn-h', 'optionsscene').setScale(0.35);
    this.leaderBtn = new Button(this, 550, 350, 'leader-btn', 'leader-btn-h', 'gamescene').setScale(0.35);
    this.creditsBtn = new Button(this, 550, 400, 'credits-btn', 'credits-btn-h', 'gamescene').setScale(0.35);

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      console.log(this.model.musicOn)
      this.bgMusic = this.sound.add(
        'menusong',
        { volume: 0.3, loop: true },
      );
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  },
});