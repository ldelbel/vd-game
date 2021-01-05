import { GameScene } from '../scenes/game';
import { PreloaderScene } from '../scenes/preloader';
import { MenuScene } from '../scenes/menu';
import { Tutorial1 } from '../scenes/tutorial1';
import { Tutorial2 } from '../scenes/tutorial2';
import { Tutorial3 } from '../scenes/tutorial3';
import { Tutorial4 } from '../scenes/tutorial4';
import { Tutorial5 } from '../scenes/tutorial5';
import { Tutorial6 } from '../scenes/tutorial6';
import { Tutorial7 } from '../scenes/tutorial7';
import { OptionsScene } from '../scenes/options';
import { Pause } from '../scenes/pause';
import { GameOver } from '../scenes/gameover';
import { Leaderboard } from '../scenes/leaderboard';
import { Credits } from '../scenes/credits';


const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'phaser-example',
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1100,
    height: 600,
  },
  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
      debug: false,
      gravity: 0,
    },
  },
  scene: [
    PreloaderScene,
    MenuScene,
    OptionsScene,
    Tutorial1,
    Tutorial2,
    Tutorial3,
    Tutorial4,
    Tutorial5,
    Tutorial6,
    Tutorial7,
    GameScene,
    Pause,
    GameOver,
    Leaderboard,
    Credits],
};

export default config;