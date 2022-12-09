const fs = require('fs');
const text = fs.readFileSync("./input.txt", 'utf-8');
const textByLine = text.split('\n');

const MOVES = {
    ROCK: 1,
    PAPER: 2,
    SCISSOR: 3
};

const OUTCOME = {
    LOSE: 'X',
    DRAW: 'Y',
    WIN: 'Z'
}

const parseRockPaperScissor = (letter) => {
    let move;
    if(letter === 'A' || letter === 'X') move = MOVES.ROCK;
    else if (letter === 'B' || letter === 'Y') move = MOVES.PAPER;
    else if (letter === 'C' || letter === 'Z') move = MOVES.SCISSOR;
    return move;
}

const parseExpectedOutcome = (opponent, outcome) => {
 if(outcome === OUTCOME.DRAW) return opponent
 else if(outcome === OUTCOME.WIN){
    if(opponent === MOVES.ROCK) return MOVES.PAPER
    else if (opponent === MOVES.PAPER) return MOVES.SCISSOR
    else return MOVES.ROCK
 }
 else {
    if(opponent === MOVES.ROCK) return MOVES.SCISSOR
    else if (opponent === MOVES.PAPER) return MOVES.ROCK
    else return MOVES.PAPER
 }
}

const calculateScore = (opponent, me) => {
    let score = 0;
    score += me
    if(me === opponent) return score += 3
    if(me === MOVES.ROCK) {
        return opponent === MOVES.SCISSOR ? score += 6 : score
    }
    if(me === MOVES.PAPER) {
        return opponent === MOVES.ROCK ? score += 6 : score
    }
    if(me === MOVES.SCISSOR) {
        return opponent === MOVES.PAPER ? score += 6 : score
    }
}

const strategyOne = ([x, y]) => {
    const opponent = parseRockPaperScissor(x)
    const me = parseRockPaperScissor(y)
    return calculateScore(opponent, me)
};

const strategyTwo = ([x, y]) => {
    const opponent = parseRockPaperScissor(x)
    const me = parseExpectedOutcome(opponent, y)
    return calculateScore(opponent, me)  
}

let strategyOneResult = 0;
let strategyTwoResult = 0;
textByLine.forEach((round) => {
    if(round.length === 3){
       strategyOneResult += strategyOne(round.split(' ')) 
       strategyTwoResult += strategyTwo(round.split(' '))
    }
})
console.log(`The result from strategy one is ${strategyOneResult}`)
console.log(`The result from strategy two is ${strategyTwoResult}`)