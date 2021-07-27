import getFinalPatterns from './getFinalPatterns';
import run from './run';
import { IOptions } from './IOptions';

function nodeGlob(patterns: string | string[], options: IOptions): string[] {
  const result: string[] = [];
  const defaultOptions = {
    cwd: process.cwd(),
  };
  const currentOptions = Object.assign(defaultOptions, options);
  const finalPatterns = getFinalPatterns(patterns);

  run('', finalPatterns, result, currentOptions.cwd);

  return result;
}

export default nodeGlob;
