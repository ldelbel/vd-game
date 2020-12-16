
let gameState = {
  control: {
    glucose: 0,
    gamma: 0,
    hostHealth: 500,
    score: 0,
    difficulty: 1    
  },
  action: {
    takeDamage: function(virus){
      gameState.control.hostHealth -= virus.life;
      virus.destroy();
    },
    getGlucose: function(lympho,glucose) {
      glucose.destroy()
      if(gameState.control.glucose < 20) {
        gameState.control.glucose += 1;
        gameState.antibody1.fireRate = 400 - gameState.control.glucose * 10;
        gameState.antibody2.fireRate = 400 - gameState.control.glucose * 10;
        gameState.antibody3.fireRate = gameState.antibody1 - 100;
      }
    },
    getInterferon: function(lympho, interferon) {
      interferon.destroy()
      if(gameState.control.gamma < 4) {
        gameState.control.gamma += 1;
      }
    },
    updateLifeBar: function(lifebar){
      if(gameState.control.hostHealth < 0){
        lifebar.displayWidth = 0;
      } else {
        lifebar.displayWidth = 202.5 * (gameState.control.hostHealth/500);
      }
    },
    updateEnergyBar: function(energybar) {
      energybar.displayWidth = 289.8 * (gameState.control.glucose / 20);
    },
    updateGammaBar: function(gammabar) {
      gammabar.displayWidth = 184.5 * (gameState.control.gamma / 4);
    },
  }
};

export class GameScene extends Phaser.Scene {

  preload() {
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
    this.load.image('glucose', '../assets/glucose.png');
    this.load.image('interferon', '../assets/interferon.png');
  }
  
  create() {
    // Install Weapon Plugin
    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin.WeaponPlugin,
      'weapons',
      this
  );

    this.physics.world.setBounds(0,100,1050,450);
    // Defining important variables
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
    
    const panel = this.add.image(0,0, 'panel').setOrigin(0,0).setScale(0.45);
    this.lifeBar = this.add.image(193,16,'lifebar').setOrigin(0,0).setScale(0.45);
    this.energyBar = this.add.image(106,66,'energybar').setOrigin(0,0).setScale(0.45);
    this.gammaBar = this.add.image(428,41,'gammabar').setOrigin(0,0).setScale(0.45);
    const frameLife = this.add.image(189, 10.5, 'frame-life').setOrigin(0,0).setScale(0.445);
    const frameEnergy = this.add.image(100.5,60, 'frame-energy').setOrigin(0,0).setScale(0.45);
    const frameGamma = this.add.image(422,35, 'frame-gamma').setOrigin(0,0).setScale(0.45);


    // create elements
    const redCells = this.physics.add.group();
    const whiteCells = this.physics.add.group();
    gameState.lympho = this.physics.add.sprite(200, 200, 'lympho1').setScale(0.6);
    gameState.lympho.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
      key: 'lymphoAnimation',
      frames: this.anims.generateFrameNumbers('lympho1', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1
    });
    gameState.lympho.anims.play('lymphoAnimation',true)


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
    // const redCellLoop = this.time.addEvent({
    //   delay: 300,
    //   callback: redCellCreate,
    //   callbackScope: this,
    //   loop: true
    // });
    // const whiteCellLoop = this.time.addEvent({
    //   delay: 400,
    //   callback: whiteCellCreate,
    //   callbackScope: this,
    //   loop: true
    // });    

    // firing antibodies    
    gameState.antibody1 = this.add.weapon(-1, 'antibody1');
    gameState.antibody1.bulletAngleOffset = 90;
    gameState.antibody1.bulletSpeed = 400;
    gameState.antibody1.fireAngle = 0;
    gameState.antibody1.fireRate = 400;
    gameState.antibody1.trackSprite(gameState.lympho,0,0);

    gameState.antibody2 = this.add.weapon(-1, 'antibody2');
    gameState.antibody2.bulletAngleOffset = 90;
    gameState.antibody2.bulletSpeed = 400;
    gameState.antibody2.fireAngle = 0;
    gameState.antibody2.fireRate = 400;
    gameState.antibody2.trackSprite(gameState.lympho,0,0);

    gameState.antibody3 = this.add.weapon(-1, 'antibody3');
    gameState.antibody3.bulletAngleOffset = 90;
    gameState.antibody3.bulletSpeed = 400;
    gameState.antibody3.fireAngle = 0;
    gameState.antibody3.fireRate = gameState.antibody1.fireRate - 100;
    gameState.antibody3.trackSprite(gameState.lympho,0,0);

    gameState.currentAntibody = gameState.antibody1;

    gameState.switchAntibody = function() {
      if(gameState.currentAntibody == gameState.antibody1) {
        gameState.currentAntibody = gameState.antibody2;
      } else if(gameState.currentAntibody == gameState.antibody2){
        gameState.currentAntibody = gameState.antibody1;
      }
    }

    // Enemies
    gameState.virus1 = this.physics.add.group();
    gameState.virus2 = this.physics.add.group();
    let random = Math.random() - Math.random();
    this.virus1 = gameState.virus1.create(gameState.gameWidth, 150 + Math.random() * 300, 'virus1').setScale(0.2);
        this.virus1.setVelocity(-100, 0);
        this.virus1.life = 30;
        this.virus1.maxLife = 30;
        this.virus1.setBounce(1,1);
        this.virus1.setMass(100000);

    function virusCreate1() {
      for(let i = 0; i < 2; i++) {
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
      for(let i = 0; i < 2; i++) {
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
      let random = Math.random() - Math.random();
      let virus1 = gameState.virus1.create(gameState.gameWidth, 180 + Math.random() * 280, 'virus11').setScale(0.4);
      virus1.setVelocity(-60, 100 * random);
      virus1.maxLife = 100;
      virus1.life = 100;
      virus1.setBounce(1,1)
      virus1.setMass(100000)
    }

    function virusCreate21() {
      let random = Math.random() - Math.random();
      let virus1 = gameState.virus2.create(gameState.gameWidth, 180 + Math.random() * 280, 'virus21').setScale(0.4);
      virus1.setVelocity(-60, 100 * random);
      virus1.maxLife = 100;
      virus1.life = 100;
      virus1.setBounce(1,1);
      virus1.setMass(100000);
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
    
    function hitVirusHard(antibody, virus) {
      antibody.destroy();
      virus.life -= 10;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        gameState.control.score += virus.maxLife/10
        virus.destroy()
      }
    }

    function hitVirusSoft(antibody, virus) {
      antibody.destroy();
      virus.life -= 5;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        virus.destroy()
        gameState.control.score += virus.maxLife/10
      }
    }

    function hitVirusVeryHard(antibody, virus) {
      antibody.destroy();
      virus.life -= 15;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        gameState.control.score += virus.maxLife/10
        virus.destroy()
      }
    }

    // Colliders



    // Glucose and Interferon
    gameState.glucoses = this.physics.add.group();
    gameState.interferonGammas = this.physics.add.group();

    function glucoseCreate() {
      let random = Math.random() - Math.random();
      let glucose = gameState.glucoses.create(gameState.gameWidth, 180 + Math.random() * 280, 'glucose').setScale(0.1);
      glucose.setVelocity(-200, 0);
    }

    const glucoseLoop = this.time.addEvent({
      delay: 17000,
      callback: glucoseCreate,
      callbackScope: this,
      loop: true
    });

    function interferonCreate() {
      let random = Math.random() - Math.random();
      let interferon = gameState.interferonGammas.create(gameState.gameWidth, 180 + Math.random() * 280, 'interferon').setScale(0.15);
      interferon.setVelocity(-200, 0);
    }

    const interferonLoop = this.time.addEvent({
      delay: 22000,
      callback: interferonCreate,
      callbackScope: this,
      loop: true
    });

    this.timer = 0;
    this.gammaOn = function() {
      if(gameState.control.gamma === 4){
        gameState.currentAntibody = gameState.antibody3
        this.timer = this.time.delayedCall(10000, this.gammaOff, null, this);
      }
    }

    this.gammaOff = function() {
      gameState.currentAntibody = gameState.antibody1;
      gameState.control.gamma = 0;
      this.timer = 0;
    }

    this.input.keyboard.on('keydown_S', this.gammaOn, this);

    this.physics.add.collider(gameState.virus1,  gameState.antibody1.bullets, hitVirusHard, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody1.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus1,  gameState.antibody2.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody2.bullets, hitVirusHard, null, this);
    this.physics.add.collider(gameState.virus1,  gameState.antibody3.bullets, hitVirusVeryHard, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody3.bullets, hitVirusVeryHard, null, this);

    this.physics.add.collider(gameState.lympho, gameState.lines);
    this.physics.add.collider(gameState.virus1, gameState.lines);
    this.physics.add.collider(gameState.virus2, gameState.lines);

    this.physics.add.overlap(gameState.virus1, this.control,  gameState.action.takeDamage, null, this);
    this.physics.add.overlap(gameState.virus2, this.control,  gameState.action.takeDamage, null, this);
    this.physics.add.overlap(gameState.glucoses, gameState.lympho, gameState.action.getGlucose, null, this);
    this.physics.add.overlap(gameState.interferonGammas, gameState.lympho, gameState.action.getInterferon, null, this)
  }

  update() {
    this.scene.pause()
    
    // if(this.timer !== 0) {
    //   console.log(10 - Math.trunc(this.timer.getElapsedSeconds()))
    // }

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

      

    }
}