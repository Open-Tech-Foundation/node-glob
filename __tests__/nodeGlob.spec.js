import nodeGlob from '../lib/index.js';

describe('nodeGlob', () => {
  test('index', () => {
    expect(nodeGlob()).toMatch(/Hello World!/);
  });
});
