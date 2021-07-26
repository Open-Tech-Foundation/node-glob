import sanitizePatterns from './sanitizePatterns';

function getFinalPatterns(patterns: string | string[]): string[] {
  let finalPatterns: string[] = [];

  finalPatterns = sanitizePatterns(
    typeof patterns === 'string' ? [patterns] : patterns
  );

  return finalPatterns;
}

export default getFinalPatterns;
