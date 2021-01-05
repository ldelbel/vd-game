import Phaser from 'phaser';
import MenuButton from '../game/resources/menubutton';

const MenuScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function MenuScene() {
    Phaser.Scene.call(this, { key: 'menuscene' });
  },

  create() {
    const panel = this.add.image(550, 300, 'menu-panel').setScale(0.35);
    this.playBtn = new MenuButton(this, 550, 220, 'play-btn', 'play-btn-h', 'tutorial1').setScale(0.35);
    this.optionsBtn = new MenuButton(this, 550, 280, 'options-btn', 'options-btn-h', 'optionsscene').setScale(0.35);
    this.leaderBtn = new MenuButton(this, 550, 340, 'leader-btn', 'leader-btn-h', 'leaderboardscene').setScale(0.35);
    this.creditsBtn = new MenuButton(this, 550, 400, 'credits-btn', 'credits-btn-h', 'creditsscene').setScale(0.35);

    this.model = this.sys.game.globals.model;

    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
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

export default MenuScene;