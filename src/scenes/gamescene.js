
let gameState = {};

export class GameScene extends Phaser.Scene {

  preload() {
    this.load.image('background', '../assets/one-path-background.png');
    this.load.image('lympho', '../assets/lymphocite.png');
    this.load.image('red-cell', '../assets/red-cell.png');
    this.load.image('white-cell', '../assets/white-cell.png');
    this.load.image('antibody1', '../assets/antibody1.png');
    this.load.image('antibody2', '../assets/antibody2.png');
    this.load.image('virus1', '../assets/virus-1.png');
    this.load.image('virus2', '../assets/virus-2.png');
  }
  
  create() {
    // Install Weapon Plugin
    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin.WeaponPlugin,
      'weapons',
      this
  );

    // Defining important variables
    gameState.gameWidth = this.game.config.width;
    gameState.gameHeight = this.game.config.height;

    // background
    const background = this.add.image(0, -40, 'background').setScale(0.367);
    background.setOrigin(0,0);
    background.depth = -2;

    // create elements
    const redCells = this.physics.add.group();
    const whiteCells = this.physics.add.group();
    gameState.lympho = this.add.image(100, 200, 'lympho').setScale(0.25);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    // background animations
    function whiteCellCreate() {
      const yCoord = Math.random() * 320 + 160;
      const cell = whiteCells.create(1200, yCoord,'white-cell');
      cell.setScale(0.015);
      cell.alpha = 0.5;
      cell.setVelocityX(-200);
      cell.depth = -1;
    };
    function redCellCreate() {
      const yCoord = Math.random() * 320 + 160;
      const cell = redCells.create(1200, yCoord,'red-cell');
      cell.setScale(0.04);
      cell.alpha = 0.5;
      cell.setVelocityX(-200);
      cell.depth = -1;
    };
    const redCellLoop = this.time.addEvent({
      delay: 250,
      callback: redCellCreate,
      callbackScope: this,
      loop: true
    });
    const whiteCellLoop = this.time.addEvent({
      delay: 300,
      callback: whiteCellCreate,
      callbackScope: this,
      loop: true
    });    

    // firing antibodies    
    gameState.antibody1 = this.add.weapon(30, 'antibody1');
    gameState.antibody1.bulletAngleOffset = 90;
    gameState.antibody1.bulletSpeed = 400;
    gameState.antibody1.fireAngle = 0;
    gameState.antibody1.fireRate = 400;
    gameState.antibody1.trackSprite(gameState.lympho,0,0);
    gameState.antibody1.bullets.children.entries.forEach( bullet => {
      bullet.scale = 0.1
      bullet.body.allowGravity = false
    })

    gameState.antibody2 = this.add.weapon(30, 'antibody2');
    gameState.antibody2.bulletAngleOffset = 90;
    gameState.antibody2.bulletSpeed = 400;
    gameState.antibody2.fireAngle = 0;
    gameState.antibody2.fireRate = 400;
    gameState.antibody2.trackSprite(gameState.lympho,0,0);
    gameState.antibody2.bullets.children.entries.forEach( bullet => {
      bullet.scale = 0.1
      bullet.body.allowGravity = false
    })

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


    let enemy1 =  gameState.virus1.create(gameState.gameWidth - 100, gameState.gameHeight/2 - 30, 'virus1').setScale(0.3)
    enemy1.life = 30;
    enemy1.body.allowGravity = false;
    enemy1.setImmovable(true);
    let enemy2 =  gameState.virus2.create(gameState.gameWidth - 100, gameState.gameHeight/2 + 40, 'virus2').setScale(0.3)
    enemy2.life = 30;
    enemy2.body.allowGravity = false;
    enemy2.setImmovable(true);


    this.physics.add.collider(gameState.virus1,  gameState.antibody1.bullets, hitVirusHard, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody1.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus1,  gameState.antibody2.bullets, hitVirusSoft, null, this);
    this.physics.add.collider(gameState.virus2,  gameState.antibody2.bullets, hitVirusHard, null, this);
     
    
    function hitVirusHard(antibody, virus) {
      antibody.destroy();
      virus.life -= 10;
      if(virus.life <= 0){
        virus.destroy()
      }
    }

    function hitVirusSoft(antibody, virus) {
      antibody.destroy();
      virus.life -= 5;
      if(virus.life <= 0){
        virus.destroy()
      }
    }

    console.log(Phaser.Input)
  }

  update() {
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
        console.log('working')
        gameState.switchAntibody()
      }
    }
}