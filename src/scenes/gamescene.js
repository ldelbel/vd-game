export class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('background', '../assets/one-path-background.png');
    this.load.image('lympho', '../assets/lymphocite.png');
    this.load.image('red-cell', '../assets/red-cell.png');
    this.load.image('white-cell', '../assets/white-cell.png');
  }
  
  create() {
    // background
    let background = this.add.image(0, -40, 'background').setScale(0.367);
    background.setOrigin(0,0)  

    const redCells = this.physics.add.group();
    const whiteCells = this.physics.add.group();

    function whiteCellCreate() {
      let yCoord = Math.random() * 320 + 160;
      let cell = whiteCells.create(1200, yCoord,'white-cell');
      cell.setScale(0.015)
      cell.alpha = 0.6
      cell.setVelocityX(-200)
    }

    function redCellCreate() {
      let yCoord = Math.random() * 320 + 160;
      let cell = redCells.create(1200, yCoord,'red-cell');
      cell.setScale(0.04)
      cell.alpha = 0.6
      cell.setVelocityX(-200)
    }

    const redCellLoop = this.time.addEvent({
      delay: 400,
      callback: redCellCreate,
      callbackScope: this,
      loop: true
    })

    const whiteCellLoop = this.time.addEvent({
      delay: 500,
      callback: whiteCellCreate,
      callbackScope: this,
      loop: true
    })

     //lymphocite
     let lymphoImg = this.add.image(100, 200, 'lympho').setScale(0.25);

  }
}