const Model = require('../src/model');

describe('Model instance', () => {
  const model = new Model();
  const props = ['_soundOn', '_musicOn', '_bgMusicPlaying'];

  it('has Model Class as prototype', () => {
    expect(
      Object.getPrototypeOf(model) === Object.getPrototypeOf(new Model()),
    ).toBe(true);
  });

  it('inherits all properties', () => {
    Object.keys(model).forEach(prop => {
      expect(props).toContain(prop);
    });
  });

  it('has default value for properties', () => {
    expect(model.soundOn).toBe(true);
    expect(model.musicOn).toBe(true);
    expect(model.bgMusicPlaying).toBe(false);
  });
});