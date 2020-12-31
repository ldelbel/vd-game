import Model from '../model'

export var PreloaderScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize: function Preloader ()
	{
		Phaser.Scene.call(this, {
			key: 'preloader',
			pack: {
				files: [
					{ type: 'image', key: 'loadingbar_bg', url: '../assets/loadingbar_bg.png' },
					{ type: 'image', key: 'loadingbar_fill', url: '../assets/loadingbar_fill.png' }
				]
			}
		});
	},
	
	setPreloadSprite: function (sprite)
	{
		this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height };
		sprite.visible = true;
		this.load.on('progress', this.onProgress, this );
		this.load.on('fileprogress', this.onFileProgress, this );
	},
	
	onProgress: function (value) {

		if (this.preloadSprite)
		{
			var w = Math.floor(this.preloadSprite.width * value);
			console.log('onProgress: value=' + value + " w=" + w);
			this.preloadSprite.sprite.frame.width    = (w <= 0 ? 1 : w);
			this.preloadSprite.sprite.frame.cutWidth = w;
			this.preloadSprite.sprite.frame.updateUVs();
		}
	},
	
	onFileProgress: function (file) {
		console.log('onFileProgress: file.key=' + file.key);
  },
  
  preload: function ()
	{
		this.loadingbar_bg   = this.add.sprite(550, 300, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(550, 300, "loadingbar_fill");
		this.setPreloadSprite(this.loadingbar_fill);
    this.load.image('menu-panel', '../assets/panel-menu.png');   
    this.load.image('play-btn', '../assets/btn-play.png');
    this.load.image('play-btn-h', '../assets/btn-play-h.png');
    this.load.image('options-btn', '../assets/btn-options.png');
    this.load.image('options-btn-h', '../assets/btn-options-h.png');
    this.load.image('leader-btn', '../assets/btn-leader.png');
    this.load.image('leader-btn-h', '../assets/btn-leader-h.png');
    this.load.image('credits-btn', '../assets/btn-credits.png');
    this.load.image('credits-btn-h', '../assets/btn-credits-h.png');
  
    this.load.image('tutorial1', '../assets/tutorial1.png');
    this.load.image('tutorial2', '../assets/tutorial2.png');
    this.load.image('tutorial3', '../assets/tutorial3.png');
    this.load.image('tutorial4', '../assets/tutorial4.png');
    this.load.image('tutorial5', '../assets/tutorial5.png');
    this.load.image('tutorial6', '../assets/tutorial6.png');
    this.load.image('tutorial7', '../assets/tutorial7.png');
    this.load.image('menu-btn', '../assets/menu-btn.png');
    this.load.image('prev-btn', '../assets/prev-btn.png');
    this.load.image('next-btn', '../assets/next-btn.png');
    this.load.image('skip-btn', '../assets/skip-btn.png');

    this.load.image('background', '../assets/background-new.png');
    this.load.image('score', '../assets/score.png');
    this.load.image('panel', '../assets/panel.png');
    this.load.image('frame-life', '../assets/frame-life.png');
    this.load.image('frame-energy', '../assets/frame-energy.png');
    this.load.image('frame-gamma', '../assets/frame-gamma.png');
    this.load.image('lifebar', '../assets/lifebar.png');
    this.load.image('energybar', '../assets/energybar.png');
    this.load.image('gammabar', '../assets/gammabar.png');
    this.load.image('line', '../assets/line.png');
    this.load.image('vertical-line', '../assets/vertical-line.png');
    this.load.spritesheet('lympho1', '../assets/lymphocyte-blue.png', {frameWidth: 272, frameHeight: 237}, 6);
    this.load.spritesheet('lympho2', '../assets/lymphocyte-yellow.png', {frameWidth: 272, frameHeight: 237}, 6);
    this.load.spritesheet('lympho3', '../assets/lymphocyte-green.png', {frameWidth: 272, frameHeight: 237}, 6);
    this.load.image('red-cell', '../assets/red-cell.png');
    this.load.image('white-cell', '../assets/white-cell.png');
    this.load.image('antibody1', '../assets/antibody1-small.png');
    this.load.image('antibody2', '../assets/antibody2-small.png');
    this.load.image('antibody3', '../assets/antibody-special.png');
    this.load.image('virus1', '../assets/virus-blue-1.png');
    this.load.image('virus11', '../assets/virus-blue-2.png');
    this.load.image('virus2', '../assets/virus-yellow-1.png');
    this.load.image('virus21', '../assets/virus-yellow-2.png');
    this.load.image('virus3', '../assets/virus-green.png');
    this.load.image('covid-blue', '../assets/covid-blue-min.png');
    this.load.image('covid-yellow', '../assets/covid-yellow-min.png');
    this.load.image('covid-green', '../assets/covid-green-min.png');
    this.load.image('glucose', '../assets/glucose.png');
    this.load.image('interferon', '../assets/interferon.png');
    this.load.image('test', '../assets/test.jpg');
    this.load.image('btn', '../assets/button.jpg');
    this.load.image('btn1', '../assets/button1.png');
    this.load.image('checked', '../assets/checked.png');
    this.load.image('unchecked', '../assets/unchecked.png');
    this.load.image('music-enabled', '../assets/music-enabled.png');
    this.load.image('sound-enabled', '../assets/sound-enabled.png');

    this.load.audio('hover','../assets/audio/hover_effect.mp3');
    this.load.audio('click','../assets/audio/click_effect.mp3');
    this.load.audio('shoot','../assets/audio/shoot_effect.mp3');
    this.load.audio('menusong','../assets/audio/menu_song.mp3');
    this.load.audio('gamesong','../assets/audio/game_song.mp3');
  },
  
  create: function() {
    const model = new Model();
    this.sys.game.globals = { model };
    this.loadingbar_bg.destroy();
		this.loadingbar_fill.destroy();
		this.preloadSprite = null;
    this.scene.start('menuscene');
  }

})