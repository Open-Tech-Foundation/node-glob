import Path from 'path';
import IOptions from './IOptions';

import lsFiles from './lsFiles';

function getEntries(
  currentPath: string,
  options: IOptions
): [string[], string[]] {
  const filesList = [];
  const dirList = [];
  const entries = lsFiles(currentPath, options.cwd);

  for (let i = 0; i < entries.length; i++) {
    if (!options.dot && entries[i].name[0] === '.') {
      continue;
    }

    if (entries[i].isFile()) {
      filesList.push(Path.join(currentPath, entries[i].name));
    } else if (entries[i].isDirectory()) {
      dirList.push(Path.join(currentPath, entries[i].name));
    }
  }

  return [filesList, dirList];
}

export default getEntries;
