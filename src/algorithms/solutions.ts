export function reverseString(input: string): string {
  const numbers = input.match(/\d+/);
  const letters = input.replace(/\d+/, '');
  return letters.split('').reverse().join('') + (numbers ? numbers[0] : '');
}

export function findLongestWord(sentence: string): string {
  return sentence.split(' ').reduce((longest, current) => 
    current.length > longest.length ? current : longest
  );
}

export function countQueryOccurrences(input: string[], query: string[]): number[] {
  return query.map(q => 
    input.filter(i => i === q).length
  );
}

export function calculateDiagonalDifference(matrix: number[][]): number {
  let diagonal1 = 0;
  let diagonal2 = 0;
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    diagonal1 += matrix[i][i];
    diagonal2 += matrix[i][n - 1 - i];
  }

  return Math.abs(diagonal1 - diagonal2);
}