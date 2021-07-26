import { arrayDiff } from '@open-tech-world/es-utils';

import isMatch from './isMatch';

function getMatchingDirs(dirList: string[], patterns: string[]): string[] {
  let ignorePatterns = patterns.filter((p) => p[0] === '!');
  ignorePatterns = ignorePatterns.map((p) => p.substring(1));
  const ignoredDirs = dirList.filter((dir) => isMatch(dir, ignorePatterns));
  return arrayDiff(dirList, ignoredDirs) as string[];
}

export default getMatchingDirs;
