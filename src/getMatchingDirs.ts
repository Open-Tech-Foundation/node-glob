import { matchGlob, matchPathGlob } from '@open-tech-world/es-glob';
import { arrayDiff } from '@open-tech-world/es-utils';
import IDir from './IDir';
import isMatch from './isMatch';

function getIgnoredDirs(
  dirList: string[],
  negatedPatterns: string[]
): string[] {
  const ignorePatterns = negatedPatterns.map((p) => p.substring(1));
  return dirList.filter((dir) => isMatch(dir, ignorePatterns));
}

function isPathMatch(dir: string, patterns: string[]): boolean {
  for (let i = 0; i < patterns.length; i++) {
    if (matchGlob(dir, patterns[i])) {
      return true;
    }
  }

  return false;
}

function canFollow(dir: string, patterns: string[]): boolean {
  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i] !== '*' && dir !== patterns[i]) {
      if (matchPathGlob(dir, patterns[i])) {
        return true;
      }
    }
  }

  return false;
}

function getMatchingDirs(dirList: string[], patterns: string[]): IDir[] {
  const result: IDir[] = [];
  const negatedPatterns = patterns.filter((p) => p[0] === '!');
  const allowedPatterns = arrayDiff(patterns, negatedPatterns) as string[];

  const ignoredDirs = getIgnoredDirs(dirList, negatedPatterns);
  const allowedDirs = arrayDiff(dirList, ignoredDirs) as string[];

  for (let i = 0; i < allowedDirs.length; i++) {
    const dir = allowedDirs[i].replace(/(?:\\)/g, '/');
    const match = isPathMatch(dir, allowedPatterns);
    const follow = canFollow(dir, allowedPatterns);
    result.push({ path: dir, match, follow });
  }

  return result;
}

export default getMatchingDirs;
