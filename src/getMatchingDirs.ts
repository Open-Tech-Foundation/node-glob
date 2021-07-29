import esGlob from '@open-tech-world/es-glob';
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

function isWildCard(p: string): boolean {
  return /^(?:.*)(?:\/\*)$/.test(p);
}

function isGlobStar(p: string): boolean {
  return /^(?:.*)(?:\/\*{2})$/.test(p);
}

function isWildCardMatch(str: string, p: string): boolean {
  const pat = p.slice(0, -2);
  return esGlob(str, pat);
}

function isGlobStarMatch(str: string, p: string): boolean {
  const pat = p.slice(0, -3);
  return esGlob(str, pat);
}

function getMatchingDirs(dirList: string[], patterns: string[]): IDir[] {
  const result: IDir[] = [];
  const negatedPatterns = patterns.filter((p) => p[0] === '!');
  const allowedPatterns = arrayDiff(patterns, negatedPatterns) as string[];

  const ignoredDirs = getIgnoredDirs(dirList, negatedPatterns);
  const allowedDirs = arrayDiff(dirList, ignoredDirs) as string[];

  for (let i = 0; i < allowedDirs.length; i++) {
    let match = false;
    let follow = false;

    const dir = allowedDirs[i];

    allowedPatterns.forEach((p) => {
      const globMatch = esGlob(dir, p);
      if (globMatch) {
        match = true;
      } else {
        if (isWildCard(p) && isWildCardMatch(dir, p)) {
          follow = true;
        }

        if (isGlobStar(p)) {
          follow = true;
        }
      }

      if (globMatch && p === '*') {
        return;
      }

      if (globMatch && p === '**') {
        follow = true;
        return;
      }

      if (globMatch && p === dir) {
        return;
      }

      if (globMatch && isGlobStar(p)) {
        follow = true;
      }

      if (globMatch && isGlobStar(p) && isGlobStarMatch(dir, p)) {
        match = false;
      }
    });

    result.push({ path: dir, match, follow });
  }

  return result;
}

export default getMatchingDirs;
