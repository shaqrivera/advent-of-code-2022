const fs = require('fs');
const text = fs.readFileSync("./input.txt", 'utf-8');
const textByLine = text.split('\n');
let chunkSize = 0;
const elves = [];
for (let i = 0; i < textByLine.length; i++) {
    if(textByLine[i] === ''){
        const chunk = textByLine.slice(i - chunkSize, i);
        elves.push(chunk);
        chunkSize = 0;
        continue;
    }
    if(i === textByLine.length - 1){
        const chunk = textByLine.slice(i - chunkSize);
        elves.push(chunk);
    }
    chunkSize++;
}
const elfCalorieTotals = elves.map(elf => {
    const numericCalories = elf.map(calories => parseInt(calories));
    return numericCalories.reduce((a, b) => a+b);
});

elfCalorieTotals.sort((a,b) => b - a);
const highestCalories = elfCalorieTotals[0];
const highestThreeCalories = elfCalorieTotals[0] + elfCalorieTotals[1] + elfCalorieTotals[2];

console.log(`The elf with the highest calories has ${highestCalories} calories`);
console.log(`The three elves with the highest calories have a total of ${highestThreeCalories} calories`);