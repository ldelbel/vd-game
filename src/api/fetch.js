const Leaderboard = {
  URL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/JuiTJsSvGpUjqxus8duh/scores',
  submitScore: (username, score) => {
    fetch(Leaderboard.URL, 
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
      },)
  },
  getScores: async () => {
    try {
      const response = await fetch(Leaderboard.URL, { mode: 'cors'});
      const result = response.json();
      return result;
    } catch(err) {
      return err;
    }
  }
}

export default Leaderboard;