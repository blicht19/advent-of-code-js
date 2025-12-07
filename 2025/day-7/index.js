import {getFileContentsAs2DCharacterArray, getFileNameArgument} from "library";

const fileName = getFileNameArgument();
const input = getFileContentsAs2DCharacterArray(fileName);

const visitedSet = new Set();

const visited = (row, column) => {
    return visitedSet.has(JSON.stringify({row, column}));
}

const markLocationVisited = (row, column) => {
    visitedSet.add(JSON.stringify({row, column}));
}

const splitters = [];

const emitBeam = (grid, row, column) => {
    let sum = 0;
    for (let currentRow = row; currentRow < grid.length; currentRow++) {
        if (visited(currentRow, column)) {
            break;
        }

        markLocationVisited(currentRow, column);

        if (grid[currentRow][column] === '^') {
            splitters.push({row: currentRow, column});
            sum++;
            if (column > 0 && !visited(currentRow, column - 1)) {
                sum += emitBeam(grid, currentRow, column - 1);
            }
            if (column < grid[currentRow].length - 1 && !visited(currentRow, column + 1)) {
                sum += emitBeam(grid, currentRow, column + 1);
            }

            break;
        }
    }

    return sum;
}

const startingColumn = input[0].indexOf('S');

console.log(`Part One: ${emitBeam(input, 1, startingColumn)}`);