import { globSync } from './lib/index.js';
import fg from 'fast-glob';
import { globbySync } from 'globby';

// Change patterns here & run `yarn build` and run `node benchmark.js`
const patterns = ['*', '!node_modules', '!.git', '!.yarn'];
console.log();
console.log('Patterns: ', patterns);
console.log();

console.time('Ng');
const ngResult = globSync(patterns);
console.timeEnd('Ng');
console.log(ngResult);
console.log();

console.time('Globby');
const globbyResult = globbySync(patterns, {
  expandDirectories: false,
});
console.timeEnd('Globby');
console.log(globbyResult);
console.log();

console.time('Fg');
const fgResult = fg.sync(patterns);
console.timeEnd('Fg');
console.log();
console.log(fgResult);
console.log();

console.log(
  'fg: ',
  fgResult.length,
  'Globby: ',
  globbyResult.length,
  'ng: ',
  ngResult.length
);
