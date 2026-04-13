import { getFileContentsAsArrayOfStrings, getFileNameArgument } from "library";

const fileName = getFileNameArgument();
const input = getFileContentsAsArrayOfStrings(fileName).map(line => {
    const [column, row] = line.split(',');
    return {
        column: Number(column),
        row: Number(row)
    }
});

const getArea = (cornerOne, cornerTwo) => {
    const width = Math.abs(cornerOne.column - cornerTwo.column) + 1;
    const height = Math.abs(cornerOne.row - cornerTwo.row) + 1;
    return width * height;
}

const partOne = (coordinates) => {
    let maxArea = 0;
    for (let i = 0; i < coordinates.length; i++) {
        const cornerOne = coordinates[i];
        for (let j = i + 1; j < coordinates.length; j++) {
            const cornerTwo = coordinates[j];
            const area = getArea(cornerOne, cornerTwo);
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }

    return maxArea;
}

console.log(`Part One: ${partOne(input)}`);

const psaLeft = (psa, column, row) => column > 0 ? psa[column - 1][row] : 0;
const psaTop = (psa, column, row) => row > 0 ? psa[column][row - 1] : 0;
const psaTopLeft = (psa, column, row) => column > 0 && row > 0 ? psa[column - 1][row - 1] : 0;

const getOutsideGridCoordinates = (grid) => {
    const outside = new Set();
    outside.add(JSON.stringify([-1, -1]));
    const queue = [[-1, -1]];

    while (queue.length > 0) {
        const [column, row] = queue.pop();
        for (const [nextColumn, nextRow] of [[column - 1, row], [column + 1, row], [column, row - 1], [column, row + 1]]) {
            if (nextColumn < -1 || nextRow < -1 || nextColumn > grid.length || nextRow > grid[0].length) {
                continue;
            }
            if (0 <= nextColumn && nextColumn < grid.length && 0 <= nextRow && nextRow < grid[0].length && grid[nextColumn][nextRow] === 1) {
                continue;
            }
            if (outside.has(JSON.stringify([nextColumn, nextRow]))) {
                continue;
            }

            outside.add(JSON.stringify([nextColumn, nextRow]));
            queue.push([nextColumn, nextRow]);
        }
    }
    return outside;
}

const buildPrefixSumArray = (grid) => {
    const prefixSumArray = Array.from({ length: grid.length }, () => Array.from({ length: grid[0].length }).fill(0));
    for (let i = 0; i < prefixSumArray.length; i++) {
        for (let j = 0; j < prefixSumArray[i].length; j++) {
            const left = psaLeft(prefixSumArray, i, j);
            const top = psaTop(prefixSumArray, i, j);
            const topLeft = psaTopLeft(prefixSumArray, i, j);
            prefixSumArray[i][j] = left + top - topLeft + grid[i][j];
        }
    }
    return prefixSumArray;
}

// Prefix Sum Array approach based on HyperNeutrino's solution https://youtu.be/toDrFDh7VNs?si=yQKw4pOEJe8ARhVp
const partTwo = () => {
    const columns = Array.from(new Set(input.map(coordinate => coordinate.column))).sort((a, b) => a - b);
    const rows = Array.from(new Set(input.map(coordinate => coordinate.row))).sort((a, b) => a - b);

    const compressCoordinates = (coordinateOne, coordinateTwo) => {
        const [compressedColumn1, compressedColumn2] = [columns.indexOf(coordinateOne.column) * 2, columns.indexOf(coordinateTwo.column) * 2].sort((a, b) => a - b);
        const [compressedRow1, compressedRow2] = [rows.indexOf(coordinateOne.row) * 2, rows.indexOf(coordinateTwo.row) * 2].sort((a, b) => a - b);

        return [
            {
                column: compressedColumn1,
                row: compressedRow1
            },
            {
                column: compressedColumn2,
                row: compressedRow2
            }
        ]
    }

    const grid = Array.from({ length: columns.length * 2 - 1 }, () => Array.from({ length: rows.length * 2 - 1 }).fill(0));

    const fillBoundaryLine = (cornerOne, cornerTwo) => {
        const [compressedCoordinateOne, compressedCoordinateTwo] = compressCoordinates(cornerOne, cornerTwo);
        for (let i = compressedCoordinateOne.column; i <= compressedCoordinateTwo.column; i++) {
            for (let j = compressedCoordinateOne.row; j <= compressedCoordinateTwo.row; j++) {
                grid[i][j] = 1;
            }
        }
    }

    for (let i = 0; i < input.length - 1; i++) {
        fillBoundaryLine(input[i], input[i + 1])
    }
    fillBoundaryLine(input[input.length - 1], input[0]);

    const outside = getOutsideGridCoordinates(grid);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!outside.has(JSON.stringify([i, j]))) {
                grid[i][j] = 1;
            }
        }
    }

    const psa = buildPrefixSumArray(grid);

    const cornersAreValid = (psa, cornerOne, cornerTwo) => {
        const [compressedCoordinateOne, compressedCoordinateTwo] = compressCoordinates(cornerOne, cornerTwo);

        const left = psaLeft(psa, compressedCoordinateOne.column, compressedCoordinateTwo.row);
        const top = psaTop(psa, compressedCoordinateTwo.column, compressedCoordinateOne.row);
        const topLeft = psaTopLeft(psa, compressedCoordinateOne.column, compressedCoordinateOne.row);

        const count = psa[compressedCoordinateTwo.column][compressedCoordinateTwo.row] - left - top + topLeft;
        return count === (compressedCoordinateTwo.column - compressedCoordinateOne.column + 1) * (compressedCoordinateTwo.row - compressedCoordinateOne.row + 1)
    }

    let maxArea = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < i; j++) {
            if (cornersAreValid(psa, input[i], input[j])) {
                const area = getArea(input[i], input[j]);
                if (area > maxArea) {
                    maxArea = area;
                }
            }
        }
    }

    return maxArea;
}

console.log(`Part Two: ${partTwo()}`);