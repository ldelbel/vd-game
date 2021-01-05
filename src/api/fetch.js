const regeneratorRuntime = require('regenerator-runtime');

const LeaderboardContent = {
  URL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JuiTJsSvGpUjqxus8duh/scores',
  submitScore: (username, score) => {
    fetch(LeaderboardContent.URL,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          score: score.toString(),
        }),
      });
  },
  getScores: async () => {
    try {
      const response = await fetch(LeaderboardContent.URL, { mode: 'cors' });
      const result = response.json();
      return result;
    } catch (err) {
      if(regeneratorRuntime){
        return err;
      }
    }
  },
};

module.exports = LeaderboardContent;