
let gameState = {};

export class GameScene extends Phaser.Scene {

  preload() {
    this.load.image('background', '../assets/one-path-background.png');
    this.load.image('lympho', '../assets/lymphocite.png');
    this.load.image('red-cell', '../assets/red-cell.png');
    this.load.image('white-cell', '../assets/white-cell.png');
    this.load.image('antibody1', '../assets/antibody1.png');
  }
  
  create() {

    this.plugins.installScenePlugin(
      'WeaponPlugin',
      WeaponPlugin.WeaponPlugin,
      'weapons',
      this
  );
    // background
    const background = this.add.image(0, -40, 'background').setScale(0.367);
    background.setOrigin(0,0);

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
      cell.alpha = 0.6;
      cell.setVelocityX(-200);
    };
    function redCellCreate() {
      const yCoord = Math.random() * 320 + 160;
      const cell = redCells.create(1200, yCoord,'red-cell');
      cell.setScale(0.04);
      cell.alpha = 0.6;
      cell.setVelocityX(-200);
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

    // firing animation
    gameState.antibody = this.add.weapon(30, 'antibody1')
    // gameState.antibody.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    gameState.antibody.bulletAngleOffset = 180;
    gameState.antibody.bulletSpeed = 400;
    gameState.antibody.fireRate = 400;
    gameState.antibody.trackSprite(gameState.lympho,0,0)
    // gameState.fireAntibody = function antibodyCreate() {
    //   const xCoord = gameState.lympho.x;
    //   const yCoord = gameState.lympho.y;
    //   const antibody = gameState.antibodies.create(xCoord, yCoord,'antibody1');
    //   antibody.setScale(0.1);
    //   antibody.rotation = Math.PI/2;
    //   antibody.alpha = 0.9;
    //   antibody.setVelocityX(500);
    //   antibody.body.setAllowGravity(false)
    // };



  }

  update() {
      if(gameState.cursors.right.isDown) {
        gameState.lympho.x += 10;
      } else if(gameState.cursors.up.isDown) {
        gameState.lympho.y -= 15;
      } else if(gameState.cursors.left.isDown) {
        gameState.lympho.x -= 10;
      } else if(gameState.cursors.down.isDown) {
        gameState.lympho.y += 15;
      } else if(gameState.cursors.space.isDown) {
        gameState.antibody.fire()
      }
    }
}