import Path from 'path';

import lsFiles from './lsFiles';

function getEntries(currentPath: string, cwd: string): [string[], string[]] {
  const filesList = [];
  const dirList = [];
  // const entries = lsFiles(currentPath, '/tmp/nodeGlob');
  const entries = lsFiles(currentPath, cwd);

  for (let i = 0; i < entries.length; i++) {
    if (entries[i].isFile()) {
      filesList.push(Path.join(currentPath, entries[i].name));
    } else if (entries[i].isDirectory()) {
      dirList.push(Path.join(currentPath, entries[i].name));
    }
  }

  return [filesList, dirList];
}

export default getEntries;
