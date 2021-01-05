import Button from '../game/resources/button'
import {gameState} from '../game/gamestate'

export var GameOver = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function GameOver ()
  {
      Phaser.Scene.call(this, { key: 'gameover' });
  },

  create: function ()
  {
    const gameover = this.add.image(550,300,'gameover').setScale(0.3);
    const leaderboard = new Button(this, 550, 375, 'leaderboard-btn', 'leaderboard-btn', 'leaderboardscene').setScale(0.3);
    this.displayScore = this.add.text(660, 275, `${gameState.control.score}`, {
      color: 'green',
      fontSize: '40px',
      fontWeight: 'bold',
    }).setOrigin(1,0);


  },

});