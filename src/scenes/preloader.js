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

    this.load.image('background', '../assets/background-new.png');
    this.load.image('panel', '../assets/panel.png');
    this.load.image('frame-life', '../assets/frame-life.png');
    this.load.image('frame-energy', '../assets/frame-energy.png');
    this.load.image('frame-gamma', '../assets/frame-gamma.png');
    this.load.image('lifebar', '../assets/lifebar.png');
    this.load.image('energybar', '../assets/energybar.png');
    this.load.image('gammabar', '../assets/gammabar.png');
    this.load.image('line', '../assets/line.png');
    this.load.image('vertical-line', '../assets/vertical-line.png')
    this.load.spritesheet('lympho1', '../assets/lymphocyte2.png', {frameWidth: 176, frameHeight: 177}, 5);
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
  },
  
  create: function() {
    this.loadingbar_bg.destroy();
		this.loadingbar_fill.destroy();
		this.preloadSprite = null;

    this.scene.start('menuscene');
  }

})