const fs = require('fs');
const text = fs.readFileSync("./input.txt", 'utf-8');
const textByLine = text.trim().split('\n').map(line => line.trim().split('').map(int => parseInt(int)));

const parseTreeAndSurroundings = (array, index) => {
    const tree = array[index]
    const leftOrTopSide = array.slice(0, index)
    const rightOrBottomSide = array.slice(index + 1)
    return {tree, leftOrTopSide, rightOrBottomSide}
}

const checkVisibility = (array, index) => {
    const {tree, leftOrTopSide, rightOrBottomSide} = parseTreeAndSurroundings(array, index)

    if(!leftOrTopSide.length || !rightOrBottomSide.length) return true

    return leftOrTopSide.every(otherTree => tree > otherTree) || rightOrBottomSide.every(otherTree => tree > otherTree)
}

const createColumn = (array, index) => {
    const column = []
    for (let i = 0; i < array.length; i++) {
        const tree = array[i][index];
        column.push(tree)
    }
    return column
}

const calculateScenicScore = (row, columnIndex, rowIndex) => {
    const {tree, leftOrTopSide: leftSide, rightOrBottomSide: rightSide} = parseTreeAndSurroundings(row, columnIndex)
    const {leftOrTopSide: topSide, rightOrBottomSide: bottomSide} = parseTreeAndSurroundings(createColumn(textByLine, columnIndex), rowIndex)

    const reverseArray = (arrayToReverse) => {
        var newArray = [];
        for (var i = arrayToReverse.length - 1; i >= 0; i--) {
          newArray.push(arrayToReverse[i]);
        }
        return newArray;
      }

    const directionalScore = (array, val) => {
        let score = 1
        for (let i = 0; i < array.length; i++) {
            const arrayVal = array[i];
            if(val >= arrayVal) {
                score = i + 1
            }
            if(val <= arrayVal) {
                break
            }
        }
        return score
    }
    const leftScore = directionalScore(reverseArray(leftSide), tree)
    const topScore = directionalScore(reverseArray(topSide), tree)
    const rightScore = directionalScore(rightSide, tree)
    const bottomScore = directionalScore(bottomSide, tree)
    const scenicScore = leftScore * topScore * rightScore * bottomScore

    return scenicScore
}

const countVisibleTrees = (array) => {
    let visibleTrees = 0;
    array.forEach((line, i) => {
        for (let j = 0; j < line.length; j++) {
            if(checkVisibility(line, j)) {
                visibleTrees++
                continue
            }
            if(checkVisibility(createColumn(textByLine, j), i)) visibleTrees++
        }
    })
    return visibleTrees
}

const findHighestScenicScore = (array) => {
    let highestScenicScore = 0
    array.forEach((line, i) => {
        line.forEach((tree, j) => {
            const scenicScore = calculateScenicScore(line, j, i)
            if(scenicScore > highestScenicScore) highestScenicScore = scenicScore
        })
    })
    return highestScenicScore
}

console.log(`The number of total visible trees is ${countVisibleTrees(textByLine)}`)
console.log(`The highest scenic score is ${findHighestScenicScore(textByLine)}`)