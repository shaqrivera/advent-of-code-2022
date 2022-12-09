const fs = require('fs');
const text = fs.readFileSync("./input.txt", 'utf-8');
const textByLine = text.split('\n').filter((line) => line.length > 0);
const elfGroups = []

const groupSize = 3;
for (let i = 0; i < textByLine.length; i += groupSize) {
    elfGroups.push(textByLine.slice(i, i + groupSize));
}


const getPriority = (letter) => {
    const ASCII = letter.charCodeAt(0)
    if(ASCII >= 65 && ASCII <= 90) return ASCII - 38
    if(ASCII >= 97 && ASCII <= 122) return ASCII - 96
}

const getLetters = (set, letters) => {
    const array = Array.from(set)
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        letters[letter] = letters[letter] ? letters[letter] + 1 : 1
    }
}

const findDuplicate = (letters, count) => {
    for(const letter in letters) {
        if(letters[letter] >= count) return letter 
    }
}

const findDuplicatesInOneRucksack = () => {
    let priorities = 0

    textByLine.forEach((rucksack) => {
        const halfway = rucksack.length / 2
        const compartmentOne = new Set(rucksack.substring(0, halfway))
        const compartmentTwo = new Set(rucksack.substring(halfway))
        const letters = {}
        
        getLetters(compartmentOne, letters)
        getLetters(compartmentTwo, letters) 
        priorities += getPriority(findDuplicate(letters, 2))
    })

    console.log(`The sum of the priorities in the first round is ${priorities}`)
}

const findDuplicatesInMultipleRucksacks = () => {
    let priorities = 0
    elfGroups.forEach((elfGroup) => {
        const rucksackOne = new Set(elfGroup[0])
        const rucksackTwo = new Set(elfGroup[1])
        const rucksackThree = new Set(elfGroup[2])
        const letters = {}

        getLetters(rucksackOne, letters)
        getLetters(rucksackTwo, letters)
        getLetters(rucksackThree, letters)
        priorities += getPriority(findDuplicate(letters, 3))
    })

    console.log(`The sum of the priorities in the second round is ${priorities}`)
}

findDuplicatesInOneRucksack()
findDuplicatesInMultipleRucksacks()