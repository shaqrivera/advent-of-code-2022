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

const createColumn = (rows, index) => {
    return rows.reduce((column, trees) =>
        [...column, trees[index]]
    , [])
}

const calculateScenicScore = (row, columnIndex, rowIndex) => {
    const {tree, leftOrTopSide: leftSide, rightOrBottomSide: rightSide} = parseTreeAndSurroundings(row, columnIndex)
    const {leftOrTopSide: topSide, rightOrBottomSide: bottomSide} = parseTreeAndSurroundings(createColumn(textByLine, columnIndex), rowIndex)

    const directionalScore = (array, val) => {
        return array.reduce(([stop, score], tree, index) => {
            const nextScore = val >= tree && !stop ? index + 1 : score
            return [stop || val <= tree, nextScore]
        }, [false, 1]).pop()
    }
    const leftScore = directionalScore(leftSide.reverse(), tree)
    const topScore = directionalScore(topSide.reverse(), tree)
    const rightScore = directionalScore(rightSide, tree)
    const bottomScore = directionalScore(bottomSide, tree)
    const scenicScore = leftScore * topScore * rightScore * bottomScore

    return scenicScore
}

const countVisibleTrees = (array) => {
    return array.reduce((visibleTrees, trees, rowIndex) => {
        trees.reduce((visibleTreesInRow, tree, columnIndex) => {
            const visible =
                checkVisibility(trees, columnIndex)
                || checkVisibility(createColumn(textByLine, columnIndex), rowIndex)
            if (visible) {
                return visibleTreesInRow + 1
            } else {
                return visibleTreesInRow
            }
        }, visibleTrees)
    }, 0)
}

const findHighestScenicScore = (rows) => {
    return rows.flatMap((trees, rowIndex) =>
        trees.map((tree, columnIndex) => ({ trees, rowIndex, columnIndex }))
    ).reduce((highestScenicScore, row) => {
        const rowScenicScore = calculateScenicScore(row.trees, row.columnIndex, row.rowIndex)
        if (rowScenicScore > highestScenicScore) {
            return rowScenicScore
        } else {
            return highestScenicScore
        }
    }, 0)
}

console.log(`The number of total visible trees is ${countVisibleTrees(textByLine)}`)
console.log(`The highest scenic score is ${findHighestScenicScore(textByLine)}`)