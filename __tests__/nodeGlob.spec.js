import Os from 'os';
import Path from 'path';
import { mkdirSync, rmdirSync, writeFileSync } from 'fs';

import nodeGlob from '../lib/index.js';

const tempDir = Path.join(Os.tmpdir(), 'nodeGlob');
const paths = ['a.txt'];

beforeAll(() => {
  rmdirSync(tempDir, { recursive: true });
  mkdirSync(tempDir);
  writeFileSync(Path.join(tempDir, paths[0]), paths[0]);
});

describe('nodeGlob', () => {
  test('invalid patterns', () => {
    expect(() => nodeGlob()).toThrow();
    expect(() => nodeGlob('')).not.toThrow();
    expect(nodeGlob('')).toEqual([]);
  });
});
