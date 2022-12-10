const fs = require('fs');
const signal = fs.readFileSync("./input.txt", 'utf-8').trim();
const markerSize = 4;
const messageSize = 14;
let marker;
let message;


const findUniqueCharacters = (length, pointer) => {
    for (let i = length - 1; i < signal.length; i++) {
        const stringStart = i - (length -1)
        const chunk = signal.substring(stringStart, stringStart + length)
        const letters = chunk.split('')
        const letterSet = new Set(letters)
        if(letters.length === letterSet.size){
            pointer = i + 1
            break
        }
    }
    return pointer
}



console.log(`The number of characters before a marker is found is ${findUniqueCharacters(markerSize, marker)}`)
console.log(`The number of characters before a marker is found is ${findUniqueCharacters(messageSize, message)}`)