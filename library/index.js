import {readFileSync} from 'fs';

export const getFileNameArgument = () => {
    if (process.argv.length < 3) {
        console.error('Requires input file name as argument');
        process.exit(1);
    }

    return process.argv[2];
}

export const getFileContentsAsString = (filePath) => {
    return readFileSync(filePath).toString();
}

export const getFileContentsAsArrayOfStrings = (filePath) => {
    return getFileContentsAsString(filePath).split('\n');
}

export const getFileContentsAs2DCharacterArray = (filePath) => {
    return getFileContentsAsArrayOfStrings(filePath).map(string => string.split(''));
}

const OFFSETS = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const DIAGONALS = [[-1, -1], [-1, 1], [1, 1], [1, -1]];

export const getNeighbors = (twoDimensionalArray, row, column, includeDiagonals = false) => {
    const neighbors = [];
    let offsets = [...OFFSETS];
    if (includeDiagonals) {
        offsets = offsets.concat(DIAGONALS);
    }

    for (const [rowOffset, columnOffset] of offsets) {
        const neighborRow = row + rowOffset;
        if (neighborRow < 0 || neighborRow >= twoDimensionalArray.length) {
            continue;
        }

        const neighborColumn = column + columnOffset;
        if (neighborColumn < 0 || neighborColumn >= twoDimensionalArray[neighborRow].length) {
            continue;
        }

        neighbors.push(twoDimensionalArray[neighborRow][neighborColumn]);
    }

    return neighbors;
}