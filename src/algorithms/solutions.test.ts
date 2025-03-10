import { 
  reverseString, 
  findLongestWord, 
  countQueryOccurrences, 
  calculateDiagonalDifference 
} from './solutions';

describe('Algorithm Solutions', () => {
  test('reverseString should reverse only alphabets', () => {
    expect(reverseString('NEGIE1')).toBe('EIGEN1');
  });

  test('findLongestWord should find the longest word', () => {
    expect(findLongestWord('Saya sangat senang mengerjakan soal algoritma'))
      .toBe('mengerjakan');
  });

  test('countQueryOccurrences should count occurrences correctly', () => {
    const input = ['xc', 'dz', 'bbb', 'dz'];
    const query = ['bbb', 'ac', 'dz'];
    expect(countQueryOccurrences(input, query)).toEqual([1, 0, 2]);
  });

  test('calculateDiagonalDifference should calculate correctly', () => {
    const matrix = [
      [1, 2, 0],
      [4, 5, 6],
      [7, 8, 9]
    ];
    expect(calculateDiagonalDifference(matrix)).toBe(3);
  });
});