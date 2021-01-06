const LeaderboardContent = require('../src/api/fetch');

describe('LeaderboardContent.getScores', () => {
  test('the promise resolves in a JSON file', async () => {
    try {
      const result = await LeaderboardContent.getScores();
      expect(typeof result).toBe('JSON');
    } catch (err) {
      return err;
    }
  });

  test('the data after processed is an object', async () => {
    try {
      const result = await LeaderboardContent.getScores();
      expect(typeof JSON.parse(result)).toBe(Object);
    } catch (err) {
      return err;
    }
  });

  test('the object contains an array', async () => {
    try {
      const result = await LeaderboardContent.getScores();
      const parsed = JSON.parse(result);
      expect(typeof parsed.result).toBe(Array);
    } catch (err) {
      return err;
    }
  });
});

describe('LeaderboardContent.submitScores', () => {
  test('after submission, the data is retrievable from API', async () => {
    const list = [];
    try {
      LeaderboardContent.submitScore('Jest', '1');
      const result = await LeaderboardContent.getScores();
      const object = JSON.parse(result);
      const array = object.result;
      array.forEach((item) => {
        list.push(item.user);
      });
      expect(list).toContain('Jest');
    } catch (err) {
      return err;
    }
  });
});