function sanitizePatterns(patterns: string[]): string[] {
  const finalPatterns: string[] = [];

  for (let i = 0; i < patterns.length; i++) {
    let str = patterns[i];

    if (typeof str !== 'string') {
      continue;
    }

    if (str.length === 0) {
      continue;
    }

    if (str.match(/(?:\.\.\/)/)) {
      continue;
    }

    if (str.match(/\.\//)) {
      str = str.replace(/\.\//, '');
    }

    finalPatterns.push(str.trim());
  }

  return finalPatterns;
}

export default sanitizePatterns;
