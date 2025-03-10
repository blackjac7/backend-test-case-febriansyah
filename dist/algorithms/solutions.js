"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseString = reverseString;
exports.findLongestWord = findLongestWord;
exports.countQueryOccurrences = countQueryOccurrences;
exports.calculateDiagonalDifference = calculateDiagonalDifference;
function reverseString(input) {
    const numbers = input.match(/\d+/);
    const letters = input.replace(/\d+/, '');
    return letters.split('').reverse().join('') + (numbers ? numbers[0] : '');
}
function findLongestWord(sentence) {
    return sentence.split(' ').reduce((longest, current) => current.length > longest.length ? current : longest);
}
function countQueryOccurrences(input, query) {
    return query.map(q => input.filter(i => i === q).length);
}
function calculateDiagonalDifference(matrix) {
    let diagonal1 = 0;
    let diagonal2 = 0;
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
        diagonal1 += matrix[i][i];
        diagonal2 += matrix[i][n - 1 - i];
    }
    return Math.abs(diagonal1 - diagonal2);
}
