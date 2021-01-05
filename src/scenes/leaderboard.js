import LeaderboardContent from '../api/fetch.js'
import Button from '../game/resources/button'

export var Leaderboard = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Leaderboard ()
  {
      Phaser.Scene.call(this, { key: 'leaderboardscene' });
  },

  create: function ()
  {
    this.scene.remove('gamescene');
    this.scene.remove('gameover');
    const panel = this.add.image(550,300, 'blank-panel').setScale(0.35);
    const title = this.add.image(550,60, 'leaderboard-title').setScale(0.28);
    const list = this.add.image(550,100, 'leader-list').setScale(0.355).setOrigin(0.5,0);
    const menuBtn = new Button(this, 400, 550, 'menu-btn', 'menu-btn', 'menuscene').setScale(0.35);
 

    const listing = [{user: '', score: ''},{user: '', score: ''},{user: '', score: ''},
    {user: '', score: ''},{user: '', score: ''},{user: '', score: ''},{user: '', score: ''}
  ,{user: '', score: ''},{user: '', score: ''}]
 
    
    const data = async () => {
      try {
        const fetch = await LeaderboardContent.getScores();
        let array = fetch.result;
        array = array.sort((a,b) => b.score - a.score);
        for(let i = 0; i < 9; i++) {
          let color = ''
          switch(i){
            case 0:
              color = 'yellow';
              break;
            case 1:
              color = 'gray';
              break;
            case 2:
              color = 'red';
              break;
            default:
              color = 'green';
          }
          if(array[i]) {
            listing[i].user = this.add.text(500, 108 + 40 * i, `${array[i].user}`, {
              color: color,
              fontSize: '33px',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
            }).setOrigin(1,0);
      
            listing[i].score = this.add.text(740, 108 + 40 * i, `${array[i].score}`, {
              color: color,
              fontSize: '33px',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
            }).setOrigin(1,0);
          }
        }
      } catch(err) {
        return err
      }
    }

    data();

  },


});