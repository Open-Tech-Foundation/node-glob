import { readdirSync, Dirent } from 'fs';
import Path from 'path';

function lsFiles(path: string, cwd = ''): Dirent[] {
  const basePath = cwd || process.cwd();

  return readdirSync(Path.join(basePath, path), { withFileTypes: true });
}

export default lsFiles;
