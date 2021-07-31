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
    expect(globSync(['a/*'], options)).toEqual([
      Path.join('a', 'a2'),
      Path.join('a', 'a.txt'),
    ]);
    expect(globSync(['*_modules/*'], options)).toEqual([
      Path.join('node_modules', '@open-tech-world'),
    ]);
    expect(globSync(['*_modules/*/*'], options)).toEqual([
      Path.join('node_modules', '@open-tech-world/lib'),
    ]);
    expect(globSync(['x/*/z/*.json'], options)).toEqual([
      Path.join('x', 'y', 'z', 'x.json'),
    ]);
  });

  test('Glob star', () => {
    expect(globSync(['**'], options)).toEqual([
      'a',
      Path.join('a', 'a2'),
      Path.join('a', 'a2', 'a2.txt'),
      Path.join('a', 'a.txt'),
      'b',
      Path.join('b', 'b.png'),
      'c',
      Path.join('c', 'c.js'),
      'c++',
      Path.join('c++', 'array.cpp'),
      'd',
      Path.join('d', 'd.ts'),
      'e',
      Path.join('e', 'e.md'),
      'node_modules',
      Path.join('node_modules', '@open-tech-world'),
      Path.join('node_modules', '@open-tech-world', 'lib'),
      Path.join('node_modules', '@open-tech-world', 'lib', 'index.js'),
      'public',
      Path.join('public', 'assets'),
      Path.join('public', 'assets', '$.svg'),
      Path.join('public', 'assets', 'banner(old).png'),
      Path.join('public', 'assets', 'banner.png'),
      Path.join('public', 'assets', 'img[01].jpg'),
      Path.join('public', 'assets', 'img[02].jpg'),
      Path.join('public', 'assets', 'img[03].jpg'),
      Path.join('public', 'assets', 'logo.svg'),
      Path.join('public', 'assets', 'welcome.gif'),
      'src',
      Path.join('src', 'index.js'),
      'x',
      Path.join('x', 'y'),
      Path.join('x', 'y', 'z'),
      Path.join('x', 'y', 'z', 'x.json'),
      'config.json',
      'jest.config.js',
      'new-site.html',
      'tsconfig.json',
      'yarn.lock',
    ]);

    expect(globSync(['.git/**'], { ...options, dot: true })).toEqual([
      Path.join('.git', 'branches'),
      Path.join('.git', 'branches', 'b1'),
      Path.join('.git', 'branches', 'b2'),
    ]);

    expect(globSync(['**/@**'], options)).toEqual([
      Path.join('node_modules', '@open-tech-world'),
      Path.join('node_modules', '@open-tech-world/lib'),
    ]);

    expect(globSync(['**/@**/*'], options)).toEqual([
      Path.join('node_modules', '@open-tech-world', 'lib'),
      Path.join('node_modules', '@open-tech-world', 'lib', 'index.js'),
    ]);

    expect(globSync(['**.js'], options)).toEqual(['jest.config.js']);

    expect(globSync(['**/**.js'], options)).toEqual([
      Path.join('c', 'c.js'),
      Path.join('node_modules', '@open-tech-world', 'lib', 'index.js'),
      Path.join('src', 'index.js'),
    ]);

    expect(globSync(['x/**/z/**'], options)).toEqual([
      Path.join('x', 'y', 'z', 'x.json'),
    ]);
  });

  test('Question mark', () => {
    expect(globSync(['?'], options)).toEqual(['a', 'b', 'c', 'd', 'e', 'x']);
    expect(globSync(['a?'], options)).toEqual([]);
    expect(globSync(['.git/branches/b?'], { ...options, dot: true })).toEqual([
      Path.join('.git', 'branches', 'b1'),
      Path.join('.git', 'branches', 'b2'),
    ]);
    expect(globSync(['e/?.md'], options)).toEqual([Path.join('e', 'e.md')]);
  });

  test('Square brackets', () => {
    expect(globSync(['[]'], options)).toEqual([]);
    expect(globSync(['[a]'], options)).toEqual(['a']);
    expect(globSync(['[a]'], options)).toEqual(['a']);
    expect(globSync(['d/[a-e].ts'], options)).toEqual([Path.join('d', 'd.ts')]);
    expect(globSync(['d/[a-e].[a-z]s'], options)).toEqual([
      Path.join('d', 'd.ts'),
    ]);
    expect(globSync(['[!a]'], options)).toEqual(['b', 'c', 'd', 'e', 'x']);
    expect(globSync(['[^b-d]'], options)).toEqual(['a', 'e', 'x']);
  });

  test('Escape characters', () => {
    expect(globSync(['public/assets/img\\[01\\].jpg'], options)).toEqual([
      Path.join('public', 'assets', 'img[01].jpg'),
    ]);
    expect(globSync(['public/assets/\\$.*'], options)).toEqual([
      Path.join('public', 'assets', '$.svg'),
    ]);
    expect(globSync(['c\\+\\+/array.cpp'], options)).toEqual([
      Path.join('c++', 'array.cpp'),
    ]);
    expect(globSync(['public/assets/banner\\(old\\).png'], options)).toEqual([
      Path.join('public', 'assets', 'banner(old).png'),
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
      Path.join('public', 'assets'),
      Path.join('public', 'assets', '$.svg'),
      Path.join('public', 'assets', 'banner(old).png'),
      Path.join('public', 'assets', 'img[01].jpg'),
      Path.join('public', 'assets', 'img[02].jpg'),
      Path.join('public', 'assets', 'img[03].jpg'),
      Path.join('public', 'assets', 'logo.svg'),
      Path.join('public', 'assets', 'welcome.gif'),
    ]);

    expect(
      globSync(
        ['public/**', '!.git', '!node_modules', '!public/assets/*.jpg'],
        options
      )
    ).toEqual([
      Path.join('public', 'assets'),
      Path.join('public', 'assets', '$.svg'),
      Path.join('public', 'assets', 'banner(old).png'),
      Path.join('public', 'assets', 'banner.png'),
      Path.join('public', 'assets', 'logo.svg'),
      Path.join('public', 'assets', 'welcome.gif'),
    ]);
  });

  test('Logical OR group', () => {
    expect(globSync(['*.(js|json)'], options)).toEqual([
      'config.json',
      'jest.config.js',
      'tsconfig.json',
    ]);
    expect(globSync(['public/assets/*.(svg|gif)'], options)).toEqual([
      Path.join('public', 'assets', '$.svg'),
      Path.join('public', 'assets', 'logo.svg'),
      Path.join('public', 'assets', 'welcome.gif'),
    ]);
  });
});
