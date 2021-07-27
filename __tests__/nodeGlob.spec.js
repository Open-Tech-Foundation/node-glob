import Os from 'os';
import Path from 'path';
import { existsSync, mkdirSync, rmdirSync, writeFileSync } from 'fs';

import nodeGlob from '../lib/index.js';

const tempDir = Path.join(Os.tmpdir(), 'nodeGlob');
const paths = ['a.txt'];
const options = {
  cwd: tempDir,
};

beforeAll(() => {
  if (existsSync(tempDir)) {
    rmdirSync(tempDir, { recursive: true });
  }
  mkdirSync(tempDir);
  writeFileSync(Path.join(tempDir, paths[0]), paths[0]);
});

describe('nodeGlob', () => {
  test('invalid patterns', () => {
    expect(() => nodeGlob()).toThrow();
    expect(() => nodeGlob('', options)).not.toThrow();
    expect(nodeGlob('', options)).toEqual([]);
  });
});
