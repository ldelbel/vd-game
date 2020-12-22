export var Leaderboard = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Leaderboard ()
  {
      Phaser.Scene.call(this, { key: 'leaderboardscene' });
  },

  create: function ()
  {

  },

  backToMenu: function ()
  {
  this.scene.start('menuscene');
  }

});