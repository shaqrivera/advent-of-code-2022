const fs = require('fs');
const text = fs.readFileSync("./input.txt", 'utf-8');
const textByLine = text.split('\n').filter((line) => line.length > 0);
const elfPairsStrings = []

textByLine.forEach(pairString => elfPairsStrings.push(pairString.split(',')))
const elfPairs = elfPairsStrings.map((pair) => pair.map(rangeString => rangeString.split('-').map(string => parseInt(string))))

let overlappingPairs = 0

elfPairs.forEach(pair => {
    const biggerRange = ((pair[0][1] - pair[0][0]) >= (pair[1][1] - pair[1][0])) ? pair[0] : pair[1]
    const smallerRange = biggerRange === pair[0] ? pair[1] : pair[0]
    if((biggerRange[0] <= smallerRange[0]) && (biggerRange[1] >= smallerRange[1])) overlappingPairs += 1
})

console.log(`The number of overlapping pairs is ${overlappingPairs}`)