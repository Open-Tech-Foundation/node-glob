import Os from 'os';
import Path from 'path';
import { existsSync, mkdirSync, rmdirSync, writeFileSync } from 'fs';

const tempDir = Path.join(Os.tmpdir(), 'nodeGlob');
const paths = [
  '.gitignore',
  '.git/branches/b1',
  '.git/branches/b2',
  'a/a.txt',
  'a/a2/a2.txt',
  'b/b.png',
  'c/c.js',
  'd/d.ts',
  'e/e.md',
  'x/y/z/x.json',
  'config.json',
  'yarn.lock',
  'src/index.js',
  'node_modules/@open-tech-world/lib/index.js',
  'jest.config.js',
  'tsconfig.json',
  'public/assets/logo.svg',
  'public/assets/banner.png',
  'public/assets/banner(old).png',
  'public/assets/welcome.gif',
  'public/assets/img[01].jpg',
  'public/assets/img[02].jpg',
  'public/assets/img[03].jpg',
  'public/assets/$.svg',
  'public/robots.txt',
  'c++/array.cpp',
  'new-site.html',
];

if (existsSync(tempDir)) {
  rmdirSync(tempDir, { recursive: true });
}

mkdirSync(tempDir);

paths.forEach((path) => {
  mkdirSync(Path.join(tempDir, Path.dirname(path)), { recursive: true });
  writeFileSync(Path.join(tempDir, path), path);
});
