import {getFileContentsAsArrayOfStrings, getFileNameArgument} from "library";

const fileName = getFileNameArgument();
const input = getFileContentsAsArrayOfStrings(fileName);


const sum = (values) => {
    let sum = 0;
    values.forEach((value) => {
        sum += value;
    });

    return sum;
}

const product = (values) => {
    let product = 1;
    values.forEach((value) => {
        product *= value;
    });

    return product;
}

const solvePartOneColumn = (grid, column) => {
    let columnValues = [];
    for (let row = 0; row < grid.length - 1; row++) {
        columnValues.push(Number(grid[row][column]));
    }

    const operator = grid.at(-1)[column];
    if (operator === '+') {
        return sum(columnValues);
    } else {
        return product(columnValues);
    }
}

const partOne = (problems) => {
    const grid = problems.map(line => line.trim().split(/\s+/));
    let total = 0;
    for (let column = 0; column < grid[0].length; column++) {
        total += solvePartOneColumn(grid, column);
    }

    return total;
}

const combineColumns = (valueGrid) => {
    const combinedColumns = [];
    const rowLengths = valueGrid.map(row => row.length);
    const maxLength = Math.max(...rowLengths);
    for (let column = 0; column < maxLength; column++) {
        let combinedString = '';
        for (let row = 0; row < valueGrid.length; row++) {
            if (column >= valueGrid[row].length) {
                continue;
            }

            let character = valueGrid[row][column];
            if (character !== ' ') {
                combinedString += character;
            }
        }

        combinedColumns.push(combinedString);
    }

    return combinedColumns;
}

const performOperation = (values, operator) => {
    if (operator === '+') {
        return sum(values);
    } else {
        return product(values);
    }
}

const solvePartTwoColumns = (combinedColumns, operators) => {
    let total = 0;
    let operatorIndex = 0;
    let columnNumbers = [];

    combinedColumns.forEach((combinedColumn) => {
        if (combinedColumn !== '') {
            columnNumbers.push(Number(combinedColumn));
        } else {
            const operator = operators[operatorIndex];
            operatorIndex++;
            total += performOperation(columnNumbers, operator);
            columnNumbers = [];
        }
    });
    total += performOperation(columnNumbers, operators[operatorIndex]);

    return total;
}

const partTwo = (rows) => {
    const valueGrid = rows.map(string => string.split('')).slice(0, rows.length - 1);
    const operators = rows.at(-1).trim().split(/\s+/);
    const combinedColumns = combineColumns(valueGrid);
    return solvePartTwoColumns(combinedColumns, operators);
}


console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);