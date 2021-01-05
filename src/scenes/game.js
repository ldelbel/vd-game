import {gameState} from '../game/gamestate'
import soundState from '../game/soundstate'

export var GameScene =  new Phaser.Class ({

  Extends: Phaser.Scene,

  initialize: function GameScene() {
    Phaser.Scene.call(this, {key: 'gamescene'})
  },

  preload: function() {
  },
  
  create: function() {
    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin.WeaponPlugin,
      'weapons',
      this
  );
      if(this.sys.game.globals.model.musicOn === true){
        this.sys.game.globals.bgMusic.stop();
        this.gameSong = this.sound.add('gamesong', {volume: 0.3, loop: true});
        this.gameSong.play();
      }
      this.shoot = this.sound.add('shoot', {volume: 0.3});

    this.physics.world.setBounds(0,100,1050,450);
    gameState.gameWidth = this.game.config.width;
    gameState.gameHeight = this.game.config.height;

    // background
    const background = this.add.image(0, -50, 'background').setScale(0.367);

    this.control = this.physics.add.staticGroup();
    let controlLine = this.control.create(-100, 100, 'vertical-line').setScale(0.16).setOrigin(0,0);
    controlLine.refreshBody()
    background.setOrigin(0,0);
    background.depth = -2;
   

    gameState.lines = this.physics.add.staticGroup();
    const linePositions = [{x: 0, y: 86},{x: 0, y: 552}];
    linePositions.forEach( line => {
      gameState.lines.create(line.x,line.y,'line').setScale(0.367).setOrigin(0,0).refreshBody();
    })
    const scoreBoard = this.add.image(980,570, 'score').setScale(0.25);
    const panel = this.add.image(2,2, 'panel').setOrigin(0,0).setScale(0.45);
    const specialMode = this.add.image(635,3, 'special-mode').setOrigin(0,0).setScale(0.3);
    this.specialSwitch = this.add.image(647,40, 'disabled').setOrigin(0,0).setScale(0.3);
   
    this.lifeBar = this.add.image(194,18,'lifebar').setOrigin(0,0).setScale(0.45);
    this.energyBar = this.add.image(108,67,'energybar').setOrigin(0,0).setScale(0.45);
    this.gammaBar = this.add.image(430,42,'gammabar').setOrigin(0,0).setScale(0.45);
    const frameLife = this.add.image(191, 12.5, 'frame-life').setOrigin(0,0).setScale(0.445);
    const frameEnergy = this.add.image(102.5,62, 'frame-energy').setOrigin(0,0).setScale(0.45);
    const frameGamma = this.add.image(424,37, 'frame-gamma').setOrigin(0,0).setScale(0.45);


    // create elements
    const redCells = this.physics.add.group();
    const whiteCells = this.physics.add.group();
    gameState.lympho = this.physics.add.sprite(200, 200, 'lympho1').setScale(0.4);
    gameState.lympho.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
      key: 'lymphoAnimation1',
      frames: this.anims.generateFrameNumbers('lympho1', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'lymphoAnimation2',
      frames: this.anims.generateFrameNumbers('lympho2', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'lymphoAnimation3',
      frames: this.anims.generateFrameNumbers('lympho3', { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1
    });


    gameState.lympho.anims.play('lymphoAnimation1',true)


    // background animations
    function whiteCellCreate() {
      const yCoord = Math.random() * 380 + 140;
      const cell = whiteCells.create(1200, yCoord,'white-cell');
      cell.setScale(0.015);
      cell.alpha = 0.5;
      cell.setVelocityX(-600);
      cell.depth = -1;
    };
    function redCellCreate() {
      const yCoord = Math.random() * 380 + 140;
      const cell = redCells.create(1200, yCoord,'red-cell');
      cell.setScale(0.04);
      cell.alpha = 0.5;
      cell.setVelocityX(-600);
      cell.depth = -1;
    };
    
    const redCellLoop = this.time.addEvent({
      delay: 300,
      callback: redCellCreate,
      callbackScope: this,
      loop: true
    });
    const whiteCellLoop = this.time.addEvent({
      delay: 400,
      callback: whiteCellCreate,
      callbackScope: this,
      loop: true
    });    

    // firing antibodies    
    gameState.antibody1 = this.add.weapon(-1, 'antibody1');
    gameState.antibody1.bulletAngleOffset = 90;
    gameState.antibody1.bulletSpeed = 400;
    gameState.antibody1.fireAngle = 0;
    gameState.antibody1.fireRate = 400;
    gameState.antibody1.trackSprite(gameState.lympho,0,0);
    gameState.antibody1.on('fire', () => {
      if(soundState.soundOn === true){
      this.shoot.play();
      }
    })
    gameState.antibody2 = this.add.weapon(-1, 'antibody2');
    gameState.antibody2.bulletAngleOffset = 90;
    gameState.antibody2.bulletSpeed = 400;
    gameState.antibody2.fireAngle = 0;
    gameState.antibody2.fireRate = 400;
    gameState.antibody2.trackSprite(gameState.lympho,0,0);
    gameState.antibody2.on('fire', () => {
      if(soundState.soundOn === true){
        this.shoot.play()
      }
    })
    gameState.antibody3 = this.add.weapon(-1, 'antibody3');
    gameState.antibody3.bulletAngleOffset = 90;
    gameState.antibody3.bulletSpeed = 400;
    gameState.antibody3.fireAngle = 0;
    gameState.antibody3.fireRate = gameState.antibody1.fireRate - 100;
    gameState.antibody3.trackSprite(gameState.lympho,0,0);
    gameState.antibody3.on('fire', () => {
      if(soundState.soundOn === true){
        this.shoot.play()
      }
    })

    gameState.currentAntibody = gameState.antibody1;

    gameState.switchAntibody = function() {
      if(gameState.currentAntibody == gameState.antibody1) {
        gameState.currentAntibody = gameState.antibody2;
        gameState.lympho.anims.play('lymphoAnimation2',true);
      } else if(gameState.currentAntibody == gameState.antibody2){
        gameState.currentAntibody = gameState.antibody1;
        gameState.lympho.anims.play('lymphoAnimation1',true);
      }
    }

    // Enemies
    gameState.virus1 = this.physics.add.group();
    gameState.virus2 = this.physics.add.group();
    gameState.virus3 = this.physics.add.group();

    function virusCreate1() {
      for(let i = 0; i < 1 + gameState.control.difficulty; i++) {
        let random = Math.random() - Math.random();
        let virus1 = gameState.virus1.create(gameState.gameWidth, 150 + Math.random() * 300, 'virus1').setScale(0.2);
        virus1.setVelocity(-80, 100 * random);
        virus1.maxLife = 30;
        virus1.life = 30;
        virus1.setBounce(1,1)
        virus1.setMass(100000)
      }
    }

    function virusCreate2() {
      for(let i = 0; i < 1 + gameState.control.difficulty; i++) {
        let random = Math.random() - Math.random();
        let virus1 = gameState.virus2.create(gameState.gameWidth, 150 + Math.random() * 300, 'virus2').setScale(0.2);
        virus1.setVelocity(-80, 100 * random);
        virus1.maxLife = 30;
        virus1.life = 30;
        virus1.setBounce(1,1)
        virus1.setMass(100000)
      }
    }

    function virusCreate11() {
      for(let i = 0; i < gameState.control.difficulty; i++) {
        let random = Math.random() - Math.random();
        let virus1 = gameState.virus1.create(gameState.gameWidth, 180 + Math.random() * 280, 'virus11').setScale(0.4);
        virus1.setVelocity(-60, 100 * random);
        virus1.maxLife = 100;
        virus1.life = 100;
        virus1.setBounce(1,1)
        virus1.setMass(100000)
      }
    }

    function virusCreate21() {
      for(let i = 0; i < gameState.control.difficulty; i++) {
        let random = Math.random() - Math.random();
        let virus1 = gameState.virus2.create(gameState.gameWidth, 180 + Math.random() * 280, 'virus21').setScale(0.4);
        virus1.setVelocity(-60, 100 * random);
        virus1.maxLife = 100;
        virus1.life = 100;
        virus1.setBounce(1,1);
        virus1.setMass(100000);
      }
    }

    function virusCreate3() {
      if(gameState.control.score > 200){
        for(let i = 0; i < gameState.control.difficulty; i++){
          let random = Math.random() - Math.random();
          let virus = gameState.virus3.create(gameState.gameWidth, 180 + Math.random() * 280, 'virus3').setScale(0.4);
          virus.setVelocity(-50, 90 * random);
          virus.maxLife = 120;
          virus.life = 120;
          virus.setBounce(1,1);
          virus.setMass(100000);
        }
      }
    }

    this.sarsCreate1 = function() {
      if(gameState.control.score > 200){
        let random = Math.random() - Math.random();
        let virus = gameState.virus1.create(gameState.gameWidth + 200, 320, 'covid-blue').setScale(0.8);
        virus.setVelocity(-15, 0);
        virus.maxLife = 400;
        virus.life = 400;
        virus.setBounce(1,1);
        virus.setMass(100000);
      }
    }

    function sarsCreate2() {
      if(gameState.control.score > 400){
        let random = Math.random() - Math.random();
        let virus = gameState.virus2.create(gameState.gameWidth + 200, 320, 'covid-yellow').setScale(0.8);
        virus.setVelocity(-15, 0);
        virus.maxLife = 400;
        virus.life = 400;
        virus.setBounce(1,1);
        virus.setMass(100000);
        
      }
    }

    function sarsCreate3() {
      if(gameState.control.score > 400){
        let random = Math.random() - Math.random();
        let virus = gameState.virus3.create(gameState.gameWidth + 200, 320, 'covid-green').setScale(0.85);
        virus.setVelocity(-15, 0);
        virus.maxLife = 500;
        virus.life = 500;
        virus.setBounce(1,1);
        virus.setMass(100000);
      }
    }

    const virus1Loop = this.time.addEvent({
      delay: 7000,
      callback: virusCreate1,
      callbackScope: this,
      loop: true
    });

    const virus2Loop = this.time.addEvent({
      delay: 8000,
      callback: virusCreate2,
      callbackScope: this,
      loop: true
    });

    const virus11Loop = this.time.addEvent({
      delay: 18000,
      callback: virusCreate11,
      callbackScope: this,
      loop: true
    });

    const virus21Loop = this.time.addEvent({
      delay: 20000,
      callback: virusCreate21,
      callbackScope: this,
      loop: true
    }); 

    const virus3Loop = this.time.addEvent({
      delay: 40000,
      callback: virusCreate3,
      callbackScope: this,
      loop: true
    }); 
    
    
    function hitVirusHard(antibody, virus) {
      antibody.destroy();
      virus.life -= 10;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        gameState.control.score += virus.maxLife/10
        virus.destroy()
        if(gameState.control.score > 500 && gameState.control.difficulty === 1){
          gameState.control.difficulty += 1
        }
      }
    }

    function hitVirusSoft(antibody, virus) {
      antibody.destroy();
      virus.life -= 5;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        gameState.control.score += virus.maxLife/10
        virus.destroy()
        if(gameState.control.score > 500 && gameState.control.difficulty === 1){
          gameState.control.difficulty += 1
        }
      }
    }

    function hitVirusVeryHard(antibody, virus) {
      antibody.destroy();
      virus.life -= 15;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        gameState.control.score += virus.maxLife/10
        virus.destroy()
        if(gameState.control.score > 500 && gameState.control.difficulty === 1){
          gameState.control.difficulty += 1
        }
      }
    }

    // Glucose and Interferon
    gameState.glucoses = this.physics.add.group();
    gameState.interferonGammas = this.physics.add.group();

    function glucoseCreate() {
      let random = Math.random() - Math.random();
      let glucose = gameState.glucoses.create(gameState.gameWidth, 180 + Math.random() * 280, 'glucose').setScale(0.1);
      glucose.setVelocity(-300, 0);
    }

    const glucoseLoop = this.time.addEvent({
      delay: 17000,
      callback: glucoseCreate,
      callbackScope: this,
      loop: true
    });

    function interferonCreate() {
      let random = Math.random() - Math.random();
      let interferon = gameState.interferonGammas.create(gameState.gameWidth, 180 + Math.random() * 280, 'interferon').setScale(0.03);
      interferon.setVelocity(-300, 0);
    }

    function interferonCreate2() {
      if(gameState.control.difficulty > 1){
        let random = Math.random() - Math.random();
        let interferon = gameState.interferonGammas.create(gameState.gameWidth, 180 + Math.random() * 280, 'interferon').setScale(0.03);
        interferon.setVelocity(-300, 0);
      }
    }

    const interferonLoop = this.time.addEvent({
      delay: 25000,
      callback: interferonCreate,
      callbackScope: this,
      loop: true
    });

    const interferon2Loop = this.time.addEvent({
      delay: 22000,
      callback: interferonCreate2,
      callbackScope: this,
      loop: true
    });

    this.timer = 0;
    this.gammaOn = function() {
      if(gameState.control.gamma === 4){
        gameState.currentAntibody = gameState.antibody3
        gameState.lympho.anims.play('lymphoAnimation3',true)
        this.timer = this.time.delayedCall(12000, this.gammaOff, null, this);
      }
    }

    this.gammaOff = function() {
      gameState.currentAntibody = gameState.antibody1;
      gameState.control.gamma = 0;
      this.specialSwitch.setTexture('disabled');
      gameState.lympho.anims.play('lymphoAnimation1',true)
      this.timer = 0;
    }

    this.input.keyboard.on('keydown_S', this.gammaOn, this);

    this.physics.add.collider(gameState.virus1,  gameState.antibody1.bullets, hitVirusHard, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody1.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus1,  gameState.antibody2.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody2.bullets, hitVirusHard, null, this);
    this.physics.add.collider(gameState.virus1,  gameState.antibody3.bullets, hitVirusVeryHard, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody3.bullets, hitVirusVeryHard, null, this);
    this.physics.add.collider(gameState.virus3,  gameState.antibody1.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus3,  gameState.antibody2.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus3,  gameState.antibody3.bullets, hitVirusVeryHard, null, this);
    this.physics.add.collider(gameState.lympho, gameState.lines);
    this.physics.add.collider(gameState.virus1, gameState.lines);
    this.physics.add.collider(gameState.virus2, gameState.lines);
    this.physics.add.collider(gameState.virus3, gameState.lines);
    this.physics.add.overlap(gameState.virus1, this.control,  gameState.action.takeDamage, null, this);
    this.physics.add.overlap(gameState.virus2, this.control,  gameState.action.takeDamage, null, this);
    this.physics.add.overlap(gameState.virus3, this.control,  gameState.action.takeDamage, null, this);
    this.physics.add.overlap(gameState.glucoses, gameState.lympho, gameState.action.getGlucose, null, this);
    this.physics.add.overlap(gameState.interferonGammas, gameState.lympho, gameState.action.getInterferon, null, this);

    this.var = 0;


    this.displayScore = this.add.text(1060  ,550, `${gameState.control.score}`, {
        color: 'green',
        fontSize: '40px',
        fontWeight: 'bold',
      }).setOrigin(1,0);

    this.updateScore = () => {
      this.displayScore.setText(`${gameState.control.score}`);
    }

    this.pauseGame = () => {
      if(this.scene.settings.status == 5) {
        this.scene.pause('gamescene');
        this.scene.launch('pause');
      }
    }

    this.gameOver = function() {
      this.scene.pause();
      this.gameSong.pause();
      this.scene.launch('gameover');
    }
    this.input.keyboard.on('keydown_P', this.pauseGame, this);
  },

  update: function() {
    gameState.action.updateLifeBar(this.lifeBar);
    gameState.action.updateEnergyBar(this.energyBar);
    gameState.action.updateGammaBar(this.gammaBar);

      gameState.virus1.children.entries.forEach( virus => {
        virus.rotation += 0.02;
      })
      gameState.virus2.children.entries.forEach( virus => {
        virus.rotation -= 0.02;
      })
      gameState.glucoses.children.entries.forEach( glucose => {
        glucose.rotation -= 0.2;
      })
      gameState.interferonGammas.children.entries.forEach( interferon => {
       interferon.rotation -= 0.1;
      })

      if(gameState.cursors.right.isDown) {
        gameState.lympho.x += 10;
      } 
      if(gameState.cursors.up.isDown) {
        gameState.lympho.y -= 15;
      } 
      if(gameState.cursors.left.isDown) {
        gameState.lympho.x -= 10;
      } 
      if(gameState.cursors.down.isDown) {
        gameState.lympho.y += 15;
      } 
      if(gameState.cursors.space.isDown) {

        if(gameState.currentAntibody == gameState.antibody1){
          gameState.antibody1.fire();
        } else if(gameState.currentAntibody == gameState.antibody2) {
          gameState.antibody2.fire();
        } else if(gameState.currentAntibody == gameState.antibody3) {
          gameState.antibody3.fire();
        }
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.cursors.shift)){
        gameState.switchAntibody()
      }

      if(gameState.control.score > 200){
        if(this.var === 0){
          this.sarsCreate1();
          this.var += 1;
        }
      }

      if(gameState.control.gamma === 4){
        this.specialSwitch.setTexture('activate');
      }

      this.updateScore()

      if(gameState.control.hostHealth <= 0){
        this.gameOver();
      }
    },


})