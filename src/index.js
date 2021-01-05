import Phaser from 'phaser';
import config from './config/config';
import 'phaser3-weapon-plugin/dist/WeaponPlugin';

const hide = document.getElementById('hide');
const name = document.getElementById('name');
const submit = document.getElementById('submit');
const body = document.getElementById('body');

if (!localStorage.getItem('playerName')) {
  submit.onclick = () => {
    localStorage.setItem('playerName', name.value);
    hide.style.display = 'none';
    body.classList.remove('center');
    body.style.background = 'black';
    const game = new Phaser.Game(config);
  };
} else {
  body.classList.remove('center');
  body.style.background = 'black';
  hide.style.display = 'none';
  const game = new Phaser.Game(config);
}
