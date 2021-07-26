import getFinalPatterns from './getFinalPatterns';
import run from './run';

function nodeGlob(patterns: string | string[]): string[] {
  const result: string[] = [];
  const finalPatterns = getFinalPatterns(patterns);

  run('', finalPatterns, result);

  return result;
}

export default nodeGlob;
