import Path from 'path';

import isMatch from './isMatch';
import lsFiles from './lsFiles';
import getMatchingDirs from './getMatchingDirs';

function run(currentPath: string, patterns: string[], result: string[]): void {
  const entries = lsFiles(currentPath);
  const filesList = [];
  const dirList = [];

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].isFile()) {
      filesList.push(Path.join(currentPath, entries[i].name));
    } else if (entries[i].isDirectory()) {
      dirList.push(Path.join(currentPath, entries[i].name));
    }
  }
  const matchedDirs = getMatchingDirs(dirList, patterns);
  for (let i = 0; i < matchedDirs.length; i++) {
    if (isMatch(matchedDirs[i], patterns)) {
      result.push(matchedDirs[i]);
      run(matchedDirs[i], patterns, result);
    } else {
      run(matchedDirs[i], patterns, result);
    }
  }

  const matchedFiles = filesList.filter((file) => isMatch(file, patterns));
  result.push(...matchedFiles);
}

export default run;
