import Path from 'path';

import isMatch from './isMatch';
import getMatchingDirs from './getMatchingDirs';
import getEntries from './getEntries';
import IDir from './IDir';
import IOptions from './IOptions';

function addToResult(
  result: string[],
  list: string | string[],
  options: IOptions
): void {
  let entries = typeof list === 'string' ? [list] : list;

  if (options.absolute) {
    entries = entries.map((entry) => Path.join(options.cwd, entry));
  }

  result.push(...entries);
}

function run(
  currentPath: string,
  patterns: string[],
  result: string[],
  options: IOptions
): void {
  const [filesList, dirList] = getEntries(currentPath, options);
  const matchedFiles = filesList.filter((file) => isMatch(file, patterns));

  if (dirList.length === 0) {
    addToResult(result, matchedFiles, options);
    return;
  }

  const matchedDirs: IDir[] = getMatchingDirs(dirList, patterns);

  for (let i = 0; i < matchedDirs.length; i++) {
    const dir = matchedDirs[i];
    if (dir.match) {
      addToResult(result, dir.path, options);
    }

    if (dir.follow) {
      run(dir.path, patterns, result, options);
    }
  }

  addToResult(result, matchedFiles, options);
}

export default run;
