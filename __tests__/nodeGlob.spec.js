import Os from 'os';
import Path from 'path';

import { globSync } from '../lib/index.js';

const tempDir = Path.join(Os.tmpdir(), 'nodeGlob');

const options = {
  cwd: tempDir,
};

describe('nodeGlob', () => {
  test('Invalid patterns', () => {
    expect(() => globSync()).toThrow();
    expect(() => globSync('', options)).not.toThrow();
    expect(globSync('', options)).toEqual([]);
    expect(globSync([], options)).toEqual([]);
    expect(globSync([1], options)).toEqual([]);
    expect(globSync([{}], options)).toEqual([]);
    expect(globSync([[]], options)).toEqual([]);
  });

  test('Star', () => {
    expect(globSync(['*'], options)).toEqual([
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
    expect(globSync(['*rc'], options)).toEqual(['src']);
    expect(globSync(['*.lock'], options)).toEqual(['yarn.lock']);
    expect(globSync(['node_*'], options)).toEqual(['node_modules']);
    expect(globSync(['jest.*.js'], options)).toEqual(['jest.config.js']);
    expect(globSync(['*.json'], options)).toEqual([
      'config.json',
      'tsconfig.json',
    ]);
    expect(globSync(['a/*'], options)).toEqual(['a/a2', 'a/a.txt']);
    expect(globSync(['*_modules/*'], options)).toEqual([
      'node_modules/@open-tech-world',
    ]);
    expect(globSync(['*_modules/*/*'], options)).toEqual([
      'node_modules/@open-tech-world/lib',
    ]);
    expect(globSync(['x/*/z/*.json'], options)).toEqual(['x/y/z/x.json']);
  });

  test('Glob star', () => {
    expect(globSync(['**'], options)).toEqual([
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
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);

    expect(globSync(['.git/**'], { ...options, dot: true })).toEqual([
      '.git/branches',
      '.git/branches/b1',
      '.git/branches/b2',
    ]);

    expect(globSync(['**/@**'], options)).toEqual([
      'node_modules/@open-tech-world',
      'node_modules/@open-tech-world/lib',
    ]);

    expect(globSync(['**/@**/*'], options)).toEqual([
      'node_modules/@open-tech-world/lib',
      'node_modules/@open-tech-world/lib/index.js',
    ]);

    expect(globSync(['**.js'], options)).toEqual(['jest.config.js']);

    expect(globSync(['**/**.js'], options)).toEqual([
      'c/c.js',
      'node_modules/@open-tech-world/lib/index.js',
      'src/index.js',
    ]);

    expect(globSync(['x/**/z/**'], options)).toEqual(['x/y/z/x.json']);
  });

  test('Question mark', () => {
    expect(globSync(['?'], options)).toEqual(['a', 'b', 'c', 'd', 'e', 'x']);
    expect(globSync(['a?'], options)).toEqual([]);
    expect(globSync(['.git/branches/b?'], { ...options, dot: true })).toEqual([
      '.git/branches/b1',
      '.git/branches/b2',
    ]);
    expect(globSync(['e/?.md'], options)).toEqual(['e/e.md']);
  });

  test('Square brackets', () => {
    expect(globSync(['[]'], options)).toEqual([]);
    expect(globSync(['[a]'], options)).toEqual(['a']);
    expect(globSync(['[a]'], options)).toEqual(['a']);
    expect(globSync(['d/[a-e].ts'], options)).toEqual(['d/d.ts']);
    expect(globSync(['d/[a-e].[a-z]s'], options)).toEqual(['d/d.ts']);
    expect(globSync(['[!a]'], options)).toEqual(['b', 'c', 'd', 'e', 'x']);
    expect(globSync(['[^b-d]'], options)).toEqual(['a', 'e', 'x']);
  });

  test('Escape characters', () => {
    expect(globSync(['public/assets/img\\[01\\].jpg'], options)).toEqual([
      'public/assets/img[01].jpg',
    ]);
    expect(globSync(['public/assets/\\*.*'], options)).toEqual([
      'public/assets/*.jpg',
    ]);
    expect(globSync(['c\\+\\+/array.cpp'], options)).toEqual(['c++/array.cpp']);
    expect(globSync(['public/assets/banner\\(old\\).png'], options)).toEqual([
      'public/assets/banner(old).png',
    ]);
  });

  test('Negation', () => {
    expect(globSync(['!'], options)).toEqual([]);
    expect(globSync(['!a'], options)).toEqual([]);
    expect(globSync(['!a', 'b'], options)).toEqual(['b']);
    expect(globSync(['*', '!a'], options)).toEqual([
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
    expect(globSync(['*', '!.*'], options)).toEqual([
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
    expect(globSync(['*', '!node_modules'], options)).toEqual([
      'a',
      'b',
      'c',
      'c++',
      'd',
      'e',
      'public',
      'src',
      'x',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);
    expect(globSync(['*', '!.git', '!node_modules'], options)).toEqual([
      'a',
      'b',
      'c',
      'c++',
      'd',
      'e',
      'public',
      'src',
      'x',
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);

    expect(
      globSync(
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
      globSync(
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
    expect(globSync(['*.(js|json)'], options)).toEqual([
      'config.json',
      'jest.config.js',
      'tsconfig.json',
    ]);
    expect(globSync(['public/assets/*.(svg|gif)'], options)).toEqual([
      'public/assets/$.svg',
      'public/assets/logo.svg',
      'public/assets/welcome.gif',
    ]);
  });
});
