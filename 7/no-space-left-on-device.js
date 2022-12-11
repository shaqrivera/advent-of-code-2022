const fs = require('fs');
const textByLine = fs.readFileSync("./input.txt", 'utf-8').trim().split('\n');

const FILETYPES = {
    DIRECTORY: 'DIRECTORY',
    FILE: 'FILE'
}

class _Directory {
    constructor(name, parent = null, files = []){
        this.name = name
        this.files = files
        this.parent = parent
        this.size = this.getSize()
    }

    getParent(){
        return this.parent
    }

    getChild(name){
        const result = this.files.filter(file => file.getName() === name)

        return result ? result[0] : null
    }

    addFile(file) {
        this.files.push(file)
        return this.files[this.files.length - 1]
    }

    getSize() {
        return this.files.length ? this.files.map(file => file.getSize()).reduce((a,b) => a + b): 0;
    }

    getName() {
        return this.name
    }

    getFiles() {
        return this.files
    }

    getType() {
        return FILETYPES.DIRECTORY
    }
}

class _File {
    constructor(name, size){
        this.name = name
        this.size = size
    }

    getSize() {
        return this.size
    }
    
    getName() {
        return this.name
    }
    
    getType() {
        return FILETYPES.FILE
    }
}

const Root = new _Directory('/')

const changeDirectory = (line, parent) => {
    if(line === '$ cd ..') return parent.getParent()
    const directoryName = line.substring(5).trim()
    if(directoryName === '/') return Root
    const existingDirectory = parent.getChild(directoryName)
    if(existingDirectory){
        return existingDirectory
    }
    return parent.addFile(new _Directory(directoryName, parent))
}

const addFile = (line, parent) => {
    const sizeAndName = line.split(' ')
    parent.addFile(new _File(sizeAndName[1], parseInt(sizeAndName[0])))
}

const parseCommandDirectoryFile = (line, parent) => {
    if(line.includes('$ cd')) return changeDirectory(line, parent)
    else if(line.includes('$ ls') || line.includes('dir')) return
    else return addFile(line, parent)
}

let parent = Root

textByLine.forEach(line => {
    const returnedParent = parseCommandDirectoryFile(line, parent)
    if(returnedParent) parent = returnedParent 
})

let totalSize = 0
const findSizeLessThanOrEqual = (size, node) => {
    if(node.getType() === FILETYPES.FILE) return

    const nodeSize = node.getSize() 
    const children = node.getFiles()

    if (nodeSize <= size) totalSize += nodeSize
    if (children.length) children.forEach(child => findSizeLessThanOrEqual(size, child))
}

const deletionCandidates = []
const findGreaterThanOrEqual = (size, node) => {
    if(node.getType() === FILETYPES.FILE) return

    const nodeSize = node.getSize() 
    const children = node.getFiles()

    if (nodeSize >= size) deletionCandidates.push(nodeSize)
    if (children.length) children.forEach(child => findGreaterThanOrEqual(size, child))
}

const freeSpaceNeeded = 30000000 - (70000000 - Root.getSize())

findSizeLessThanOrEqual(100000, Root)
findGreaterThanOrEqual(freeSpaceNeeded, Root)

deletionCandidates.sort((a,b) => a - b)

console.log(`The sum of the sizes of all directories with a size of less than 100000 is ${totalSize}`)
console.log(`The size of the smallest deletion candidate is ${deletionCandidates[0]}`)