import nodeGlob from '../lib/index.js';

describe('nodeGlob', () => {
  test('index', () => {
    // expect(() => nodeGlob()).toThrow();
    expect(() => nodeGlob('*.json')).not.toThrow();
  });
});
