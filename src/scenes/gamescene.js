
let gameState = {
  control: {
    glucose: 0,
    gamma: 0,
    hostHealth: 1000,
    score: 0,
    difficulty: 1
  }
};

export class GameScene extends Phaser.Scene {

  preload() {
    this.load.image('background', '../assets/background-new.png');
    this.load.image('line', '../assets/line.png');
    this.load.image('vertical-line', '../assets/vertical-line.png')
    this.load.spritesheet('lympho1', '../assets/lymphocyte2.png', {frameWidth: 176, frameHeight: 177}, 5);
    this.load.image('red-cell', '../assets/red-cell.png');
    this.load.image('white-cell', '../assets/white-cell.png');
    this.load.image('antibody1', '../assets/antibody1-small.png');
    this.load.image('antibody2', '../assets/antibody2-small.png');
    this.load.image('virus1', '../assets/virus-blue-1.png');
    this.load.image('virus11', '../assets/virus-blue-2.png');
    this.load.image('virus2', '../assets/virus-yellow-1.png');
    this.load.image('virus21', '../assets/virus-yellow-2.png');
  }
  
  create() {
    // Install Weapon Plugin
    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin.WeaponPlugin,
      'weapons',
      this
  );
    this.physics.world.setBounds(0,100,1050,450)
    // Defining important variables
    gameState.gameWidth = this.game.config.width;
    gameState.gameHeight = this.game.config.height;

    // background
    const background = this.add.image(0, -50, 'background').setScale(0.367);
    this.control = this.physics.add.staticGroup();
    let controlLine = this.control.create(-100, 100, 'vertical-line').setScale(0.16).setOrigin(0,0);
    console.log(controlLine.body)
    controlLine.refreshBody()
    console.log(controlLine.body)
    background.setOrigin(0,0);
    background.depth = -2;
   

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


    gameState.lines = this.physics.add.staticGroup();
    const linePositions = [{x: 0, y: 86},{x: 0, y: 552}];
    linePositions.forEach( line => {
      gameState.lines.create(line.x,line.y,'line').setScale(0.367).setOrigin(0,0).refreshBody();
    })

    // background animations
    function whiteCellCreate() {
      const yCoord = Math.random() * 380 + 140;
      const cell = whiteCells.create(1200, yCoord,'white-cell');
      cell.setScale(0.015);
      cell.alpha = 0.5;
      cell.setVelocityX(-600);
      cell.body.setAllowGravity(false)
      cell.depth = -1;
    };
    function redCellCreate() {
      const yCoord = Math.random() * 380 + 140;
      const cell = redCells.create(1200, yCoord,'red-cell');
      cell.setScale(0.04);
      cell.alpha = 0.5;
      cell.setVelocityX(-600);
      cell.body.setAllowGravity(false)
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
    gameState.antibody1.fireRate = 200;
    gameState.antibody1.trackSprite(gameState.lympho,0,0);

    gameState.antibody2 = this.add.weapon(-1, 'antibody2');
    gameState.antibody2.bulletAngleOffset = 90;
    gameState.antibody2.bulletSpeed = 400;
    gameState.antibody2.fireAngle = 0;
    gameState.antibody2.fireRate = 200;
    gameState.antibody2.trackSprite(gameState.lympho,0,0);

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
        this.virus1.setBounce(1,1);
        this.virus1.setMass(100000);

        console.log(this.virus1)



    function virusCreate1() {
      for(let i = 0; i < 2; i++) {
        let random = Math.random() - Math.random();
        let virus1 = gameState.virus1.create(gameState.gameWidth, 150 + Math.random() * 300, 'virus1').setScale(0.2);
        virus1.setVelocity(-80, 100 * random);
        virus1.maxLife = 30;
        virus1.life = 30;
        virus1.setBounce(1,1)
        virus1.setMass(100000)
        virus1.body.onWorldBounds = true;
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
      virus1.setBounce(1,1)
      virus1.setMass(100000)
    }

    const virus1Loop = this.time.addEvent({
      delay: 5000,
      callback: virusCreate1,
      callbackScope: this,
      loop: true
    });

    const virus2Loop = this.time.addEvent({
      delay: 6000,
      callback: virusCreate2,
      callbackScope: this,
      loop: true
    });

    const virus11Loop = this.time.addEvent({
      delay: 15000,
      callback: virusCreate11,
      callbackScope: this,
      loop: true
    });

    const virus21Loop = this.time.addEvent({
      delay: 17000,
      callback: virusCreate21,
      callbackScope: this,
      loop: true
    });


    this.physics.add.collider(gameState.virus1,  gameState.antibody1.bullets, hitVirusHard, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody1.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus1,  gameState.antibody2.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody2.bullets, hitVirusHard, null, this);
  
    
    function hitVirusHard(antibody, virus) {
      antibody.destroy();
      virus.life -= 10;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        virus.destroy()
      }

    }

    function hitVirusSoft(antibody, virus) {
      antibody.destroy();
      virus.life -= 5;
      virus.setVelocityX(-70);
      if(virus.life <= 0){
        virus.destroy()
      }
    }



    // Colliders
    this.physics.add.collider(gameState.lympho, gameState.lines);
    this.physics.add.collider(gameState.virus1, gameState.lines);
    this.physics.add.collider(gameState.virus2, gameState.lines);
  }

  update() {

    this.physics.add.overlap(gameState.virus1, this.control,  check, null, this)

    function check(virus) {
      console.log(virus.life)
      virus.destroy()
    }


      gameState.virus1.children.entries.forEach( virus => {
        virus.rotation += 0.02;
      })

      gameState.virus2.children.entries.forEach( virus => {
        virus.rotation -= 0.02;
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
        }        
      }
      if(Phaser.Input.Keyboard.JustDown(gameState.cursors.shift)){
        gameState.switchAntibody()
      }


    }
}