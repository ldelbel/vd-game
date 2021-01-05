export var gameState = {
  control: {
    glucose: 0,
    gamma: 0,
    hostHealth: 50,
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
        gameState.antibody3.fireRate = gameState.antibody1.fireRate - 100;
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