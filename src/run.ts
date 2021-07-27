import isMatch from './isMatch';

import getMatchingDirs from './getMatchingDirs';
import getEntries from './getEntries';

function run(
  currentPath: string,
  patterns: string[],
  result: string[],
  cwd: string
): void {
  const [filesList, dirList] = getEntries(currentPath, cwd);

  const matchedDirs = getMatchingDirs(dirList, patterns);
  for (let i = 0; i < matchedDirs.length; i++) {
    if (isMatch(matchedDirs[i], patterns)) {
      result.push(matchedDirs[i]);
      run(matchedDirs[i], patterns, result, cwd);
    } else {
      run(matchedDirs[i], patterns, result, cwd);
    }
  }

  const matchedFiles = filesList.filter((file) => isMatch(file, patterns));
  result.push(...matchedFiles);
}

export default run;
