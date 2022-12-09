const fs = require('fs');
const text = fs.readFileSync("./input.txt", 'utf-8');
const textByLine = text.split('\n').filter((line) => line.length > 0);
const elfPairsStrings = []

textByLine.forEach(pairString => elfPairsStrings.push(pairString.split(',')))
const elfPairs = elfPairsStrings.map((pair) => pair.map(rangeString => rangeString.split('-').map(string => parseInt(string))))

let fullyOverlappingPairs = 0
let partialOverlappingPairs = 0

elfPairs.forEach(pair => {
    const biggerRange = ((pair[0][1] - pair[0][0]) >= (pair[1][1] - pair[1][0])) ? pair[0] : pair[1]
    const smallerRange = biggerRange === pair[0] ? pair[1] : pair[0]
    const lowerRange = biggerRange[0] <= smallerRange[0] ? biggerRange : smallerRange
    const higherRange = lowerRange === biggerRange ? smallerRange : biggerRange

    if((biggerRange[0] <= smallerRange[0]) && (biggerRange[1] >= smallerRange[1])) fullyOverlappingPairs += 1
    if(lowerRange[1] >= higherRange[0]) partialOverlappingPairs += 1
})

console.log(`The number of fully overlapping pairs is ${fullyOverlappingPairs}`)
console.log(`The number of partially overlapping pairs if ${partialOverlappingPairs}`)