import Os from 'os';
import Path from 'path';

import nodeGlob from '../lib/index.js';

const tempDir = Path.join(Os.tmpdir(), 'nodeGlob');

const options = {
  cwd: tempDir,
};

describe('nodeGlob', () => {
  test('Invalid patterns', () => {
    expect(() => nodeGlob()).toThrow();
    expect(() => nodeGlob('', options)).not.toThrow();
    expect(nodeGlob('', options)).toEqual([]);
    expect(nodeGlob([], options)).toEqual([]);
    expect(nodeGlob([1], options)).toEqual([]);
    expect(nodeGlob([{}], options)).toEqual([]);
    expect(nodeGlob([[]], options)).toEqual([]);
  });

  test('Star', () => {
    expect(nodeGlob(['*'], options)).toEqual([
      '.git',
      'a',
      'b',
      'c',
      'c++',
      'd',
      'e',
      'node_modules',
      'public',
      'src',
      'x',
      '.gitignore',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);
    expect(nodeGlob(['*rc'], options)).toEqual(['src']);
    expect(nodeGlob(['*.lock'], options)).toEqual(['yarn.lock']);
    expect(nodeGlob(['node_*'], options)).toEqual(['node_modules']);
    expect(nodeGlob(['jest.*.js'], options)).toEqual(['jest.config.js']);
    expect(nodeGlob(['*.json'], options)).toEqual([
      'config.json',
      'tsconfig.json',
    ]);
    expect(nodeGlob(['a/*'], options)).toEqual(['a/a2', 'a/a.txt']);
    expect(nodeGlob(['*_modules/*'], options)).toEqual([
      'node_modules/@open-tech-world',
    ]);
    expect(nodeGlob(['*_modules/*/*'], options)).toEqual([
      'node_modules/@open-tech-world/lib',
    ]);
    expect(nodeGlob(['x/*/z/*.json'], options)).toEqual(['x/y/z/x.json']);
  });

  test('Glob star', () => {
    expect(nodeGlob(['**'], options)).toEqual([
      '.git',
      '.git/branches',
      '.git/branches/b1',
      '.git/branches/b2',
      'a',
      'a/a2',
      'a/a2/a2.txt',
      'a/a.txt',
      'b',
      'b/b.png',
      'c',
      'c/c.js',
      'c++',
      'c++/array.cpp',
      'd',
      'd/d.ts',
      'e',
      'e/e.md',
      'node_modules',
      'node_modules/@open-tech-world',
      'node_modules/@open-tech-world/lib',
      'node_modules/@open-tech-world/lib/index.js',
      'public',
      'public/assets',
      'public/assets/$.svg',
      'public/assets/*.jpg',
      'public/assets/banner(old).png',
      'public/assets/banner.png',
      'public/assets/img[01].jpg',
      'public/assets/img[02].jpg',
      'public/assets/img[03].jpg',
      'public/assets/logo.svg',
      'public/assets/welcome.gif',
      'src',
      'src/index.js',
      'x',
      'x/y',
      'x/y/z',
      'x/y/z/x.json',
      '.gitignore',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);

    expect(nodeGlob(['.git/**'], options)).toEqual([
      '.git/branches',
      '.git/branches/b1',
      '.git/branches/b2',
    ]);

    expect(nodeGlob(['**/@**'], options)).toEqual([
      'node_modules/@open-tech-world',
      'node_modules/@open-tech-world/lib',
    ]);

    expect(nodeGlob(['**/@**/*'], options)).toEqual([
      'node_modules/@open-tech-world/lib',
      'node_modules/@open-tech-world/lib/index.js',
    ]);

    expect(nodeGlob(['**.js'], options)).toEqual(['jest.config.js']);

    expect(nodeGlob(['**/**.js'], options)).toEqual([
      'c/c.js',
      'node_modules/@open-tech-world/lib/index.js',
      'src/index.js',
    ]);

    expect(nodeGlob(['x/**/z/**'], options)).toEqual(['x/y/z/x.json']);
  });

  test('Question mark', () => {
    expect(nodeGlob(['?'], options)).toEqual(['a', 'b', 'c', 'd', 'e', 'x']);
    expect(nodeGlob(['a?'], options)).toEqual([]);
    expect(nodeGlob(['.git/branches/b?'], options)).toEqual([
      '.git/branches/b1',
      '.git/branches/b2',
    ]);
    expect(nodeGlob(['e/?.md'], options)).toEqual(['e/e.md']);
  });

  test('Square brackets', () => {
    expect(nodeGlob(['[]'], options)).toEqual([]);
    expect(nodeGlob(['[a]'], options)).toEqual(['a']);
    expect(nodeGlob(['[a]'], options)).toEqual(['a']);
    expect(nodeGlob(['d/[a-e].ts'], options)).toEqual(['d/d.ts']);
    expect(nodeGlob(['d/[a-e].[a-z]s'], options)).toEqual(['d/d.ts']);
    expect(nodeGlob(['[!a]'], options)).toEqual(['b', 'c', 'd', 'e', 'x']);
    expect(nodeGlob(['[^b-d]'], options)).toEqual(['a', 'e', 'x']);
  });

  test('Escape characters', () => {
    expect(nodeGlob(['public/assets/img\\[01\\].jpg'], options)).toEqual([
      'public/assets/img[01].jpg',
    ]);
    expect(nodeGlob(['public/assets/\\*.*'], options)).toEqual([
      'public/assets/*.jpg',
    ]);
    expect(nodeGlob(['c\\+\\+/array.cpp'], options)).toEqual(['c++/array.cpp']);
    expect(nodeGlob(['public/assets/banner\\(old\\).png'], options)).toEqual([
      'public/assets/banner(old).png',
    ]);
  });

  test('Negation', () => {
    expect(nodeGlob(['!'], options)).toEqual([]);
    expect(nodeGlob(['!a'], options)).toEqual([]);
    expect(nodeGlob(['!a', 'b'], options)).toEqual(['b']);
    expect(nodeGlob(['*', '!a'], options)).toEqual([
      '.git',
      'b',
      'c',
      'c++',
      'd',
      'e',
      'node_modules',
      'public',
      'src',
      'x',
      '.gitignore',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);
    expect(nodeGlob(['*', '!.*'], options)).toEqual([
      'a',
      'b',
      'c',
      'c++',
      'd',
      'e',
      'node_modules',
      'public',
      'src',
      'x',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);
    expect(nodeGlob(['*', '!node_modules'], options)).toEqual([
      '.git',
      'a',
      'b',
      'c',
      'c++',
      'd',
      'e',
      'public',
      'src',
      'x',
      '.gitignore',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);
    expect(nodeGlob(['*', '!.git', '!node_modules'], options)).toEqual([
      'a',
      'b',
      'c',
      'c++',
      'd',
      'e',
      'public',
      'src',
      'x',
      '.gitignore',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);

    expect(
      nodeGlob(
        ['public/**', '!.git', '!node_modules', '!public/assets/banner.png'],
        options
      )
    ).toEqual([
      'public/assets',
      'public/assets/$.svg',
      'public/assets/*.jpg',
      'public/assets/banner(old).png',
      'public/assets/img[01].jpg',
      'public/assets/img[02].jpg',
      'public/assets/img[03].jpg',
      'public/assets/logo.svg',
      'public/assets/welcome.gif',
    ]);

    expect(
      nodeGlob(
        ['public/**', '!.git', '!node_modules', '!public/assets/*.jpg'],
        options
      )
    ).toEqual([
      'public/assets',
      'public/assets/$.svg',
      'public/assets/banner(old).png',
      'public/assets/banner.png',
      'public/assets/logo.svg',
      'public/assets/welcome.gif',
    ]);
  });

  test('Logical OR group', () => {
    expect(nodeGlob(['*.(js|json)'], options)).toEqual([
      'config.json',
      'jest.config.js',
      'tsconfig.json',
    ]);
    expect(nodeGlob(['public/assets/*.(svg|gif)'], options)).toEqual([
      'public/assets/$.svg',
      'public/assets/logo.svg',
      'public/assets/welcome.gif',
    ]);
  });
});
