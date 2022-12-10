const fs = require('fs');
const text = fs.readFileSync("./input.txt", 'utf-8');
const textByLine = text.split('\n').filter((line) => line.length > 0);
const tableStrings = textByLine.splice(0,8)
const moveStrings = textByLine.slice(1)
const columns = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }
const columnsCopy = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] }

tableStrings.map(row => {
    const chunkSize = 4;
    const array = []
    for (let i = 0; i < row.length; i += chunkSize) {
        array.push(row.substring(i, i + chunkSize));
    }
    return array.map((string, i) => {
        const result = string.trim().match(/[^\[\]]/g)
        if(result){
          columns[i + 1].push(result[0])
          columnsCopy[i + 1].push(result[0])  
        } 
    })
})

const moves = moveStrings.map(moveString => {
    return moveString.match(/[0-9]+/g)
})

const crateMover9000 = ([count, from, to]) => {
    const boxesToMove = columns[from].splice(0,count)
    boxesToMove.forEach(box => columns[to].unshift(box))
}

const crateMover9001 = ([count, from, to]) => {
    const boxesToMove = columnsCopy[from].splice(0,count)
    for (let i = boxesToMove.length - 1; i > -1; i--) {
        const box = boxesToMove[i];
        columnsCopy[to].unshift(box)
    }
}

moves.forEach(move => {
    crateMover9000(move)
    crateMover9001(move)
})

for(const column in columns){ 
    console.log(`The box at the top of column ${column} after Crate Mover 9000 is ${columns[column][0]}`)
}

console.log('----------------------------------------------------------')

for(const column in columnsCopy){ 
    console.log(`The box at the top of column ${column} after Crate Mover 9001 is ${columnsCopy[column][0]}`)
}