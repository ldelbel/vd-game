import Button from '../game/resources/button'
import soundState from '../game/soundstate'

export var OptionsScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function OptionsScene ()
  {
      Phaser.Scene.call(this, { key: 'optionsscene' });
  },

  create: function ()
  {

    this.model = this.sys.game.globals.model;
    console.log(this.model)
    const panel = this.add.image(550,300, 'menu-panel').setScale(0.35);
    const musicEnabled = this.add.image(450,225, 'music-enabled').setScale(0.15).setOrigin(0,0);
    const soundEnabled = this.add.image(450,295, 'sound-enabled').setScale(0.15).setOrigin(0,0);
    const musicCheck = this.add.image(380,210, 'checked').setScale(0.17).setOrigin(0,0);
    if(this.model.musicOn === false){
      musicCheck.setTexture('unchecked');
      musicCheck.y = 214;
    } 
    const soundCheck = this.add.image(380,280, 'checked').setScale(0.17).setOrigin(0,0);
    if(this.model.soundOn === false) {
      soundCheck.setTexture('unchecked');
      soundCheck.y = 284;
    } 

    const menuBtn = new Button(this, 390, 410, 'menu-btn', 'menu-btn', 'menuscene').setScale(0.35);
    musicCheck.setInteractive();
    soundCheck.setInteractive();

    this.bgMusic = this.sys.game.globals.bgMusic;
    
    musicCheck.on('pointerdown', () => {
      if (musicCheck.texture.key == 'checked') {
      musicCheck.setTexture('unchecked');
      musicCheck.y = 214;
      this.model.musicOn = false;
      this.model.bgMusicPlaying = false;
      this.bgMusic.stop()
      } else {
        musicCheck.setTexture('checked');
        musicCheck.y = 210;
        this.model.musicOn = true;
        this.model.bgMusicPlaying = true;
        this.bgMusic.play()
      }
    })

    soundCheck.on('pointerdown', () => {
      if (soundCheck.texture.key == 'checked') {
        soundCheck.setTexture('unchecked');
        soundCheck.y = 284;
        this.model.soundOn = false;
        soundState.soundOn = false;
      } else {
        soundCheck.setTexture('checked');
        soundCheck.y = 280;
        this.model.sounOn = true;
        soundState.soundOn = true;
      }
    })

  },
});