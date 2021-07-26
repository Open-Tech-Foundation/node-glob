import nodeGlob from './lib/index.js';
import fg from 'fast-glob';
import { globbySync } from 'globby';

const pattern = ['.yarn/*', '!node_modules', '!.git'];
console.log();
console.log('Pattern: ', pattern);
console.log();

console.time('Fg');
const fgResult = fg.sync(pattern, { dot: true, onlyFiles: false });
console.timeEnd('Fg');
console.log();
console.log(fgResult);
console.log();

console.time('Globby');
const globbyResult = globbySync(pattern, {
  dot: true,
  onlyFiles: false,
  expandDirectories: false,
});
console.timeEnd('Globby');
console.log(globbyResult);
console.log();

console.time('Ng');
const ngResult = nodeGlob(pattern);
console.timeEnd('Ng');
console.log(ngResult);
console.log();

console.log(
  'fg: ',
  fgResult.length,
  'Globby: ',
  globbyResult.length,
  'ng: ',
  ngResult.length
);
