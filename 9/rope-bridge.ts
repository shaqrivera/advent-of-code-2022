import fs from 'fs'
const text = fs.readFileSync("input.txt", 'utf-8');
const commands = text.trim().split('\n').map(line => line.trim().split(' '));

type Coordinate = { x: number, y: number }
type Direction = 'U' | 'D' | 'L' | 'R'

/**
 * 
 * @param parentNode The parent node of the current node to compare
 * @param currentNode The current node to compare
 * @returns Returns true if the two nodes are touching, or false if they are not touching
 */
const isTouching = (parentNode: Coordinate, currentNode: Coordinate) => Math.abs(parentNode.x - currentNode.x) < 2 && Math.abs(parentNode.y - currentNode.y) < 2

/**
 * 
 * @param node The node to move
 * @param direction The direction to move the node
 * @returns Returns a new node, moved one space in the direction specified
 */
const moveHead = (node: Coordinate, direction: Direction): Coordinate => {
    switch(direction) {
        case 'U':
            return { ...node, y: node.y + 1 }
        case 'D':
            return { ...node, y: node.y - 1 }
        case 'L':
            return { ...node, x: node.x - 1 }
        case 'R':
            return { ...node, x: node.x + 1 }
    }
}

/**
 * 
 * @param nodes The array of coordinates to move
 * @param count The amount of spaces to move the coordinates
 * @param direction The direction to move the head
 * @param tailPositions A map of all the tail positions. Every key is an x coordinate, and every value is a set of y coordinates
 * @returns The updated coordinate array
 */
const move = (nodes: Coordinate[], count: number, direction: Direction, tailPositions: Map<number, Set<number>>): Coordinate[] => {
    let i = 0
    const updatedCoordinates: Coordinate[] = []
    while(i < count) {
        let j = 0

        while(j < nodes.length) {
            const currentNode = updatedCoordinates[j] || nodes[j]
            if(j === 0) {
                // Head node
                updatedCoordinates[j] = moveHead(currentNode, direction)
            } else {
                const parentNode = updatedCoordinates[j - 1]
                if(!isTouching(parentNode, currentNode)) {
                    updatedCoordinates[j] = { 
                        x: parentNode.x === currentNode.x 
                            ? currentNode.x 
                            : parentNode.x > currentNode.x 
                            ? currentNode.x + 1 : currentNode.x - 1, 
                        y: parentNode.y === currentNode.y 
                            ? currentNode.y 
                            : parentNode.y > currentNode.y 
                            ? currentNode.y + 1 
                            : currentNode.y - 1 }
                } else {
                    // Parent node is touching the current node
                    updatedCoordinates[j] = currentNode
                }
            }
        
            if(j === nodes.length - 1) {
                // Tail node
                const yPositionSet = tailPositions.get(updatedCoordinates[j].x) || new Set()
                yPositionSet.add(updatedCoordinates[j].y)
                tailPositions.set(updatedCoordinates[j].x, yPositionSet)
            }
            j++
        }
        i++
    }
    return updatedCoordinates
}

/**
 * 
 * @param ropeLength The length of the rope to find the sum of tail positions for
 * @returns Returns the sum of all the unique tail positions visited
 */
const findTailPositions = (ropeLength: number) => {
    const nodes: Coordinate[] = new Array(ropeLength).fill({ x: 0, y: 0 })
    const tailPositions: Map<number, Set<number>> = new Map()
    let coords: Coordinate[]
    commands.forEach(command => {
        coords = move(coords || nodes, parseInt(command[1]), command[0] as Direction, tailPositions)
    });

    let sum = 0

    tailPositions.forEach((set) => {
        sum += set.size
    })
    return sum
}  

console.log('Part one: The sum of all the tail positions when the rope length is 2 is: ', findTailPositions(2))
console.log('Part one: The sum of all the tail positions when the rope length is 10 is: ', findTailPositions(10))