import run from './run';

function nodeGlob(patterns: string[]): string[] {
  const result: string[] = [];
  run('', patterns, result);

  return result;
}

export default nodeGlob;
