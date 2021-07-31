import isMatch from './isMatch';
import getMatchingDirs from './getMatchingDirs';
import getEntries from './getEntries';
import IDir from './IDir';
import IOptions from './IOptions';

function run(
  currentPath: string,
  patterns: string[],
  result: string[],
  options: IOptions
): void {
  const [filesList, dirList] = getEntries(currentPath, options);
  const matchedFiles = filesList.filter((file) => isMatch(file, patterns));

  if (dirList.length === 0) {
    result.push(...matchedFiles);
    return;
  }

  const matchedDirs: IDir[] = getMatchingDirs(dirList, patterns);

  for (let i = 0; i < matchedDirs.length; i++) {
    const dir = matchedDirs[i];
    if (dir.match) {
      result.push(dir.path);
    }

    if (dir.follow) {
      run(dir.path, patterns, result, options);
    }
  }

  result.push(...matchedFiles);
}

export default run;
