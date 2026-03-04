import { getFileContentsAs2DCharacterArray, getFileNameArgument } from "library";

const fileName = getFileNameArgument();
const input = getFileContentsAs2DCharacterArray(fileName);

const partOne = input => {
    const visited = new Array(input[0].length).fill(false);
    const startingColumn = input[0].indexOf('S');
    visited[startingColumn] = true;

    let sum = 0;
    for (let row = 0; row < input.length; row++) {
        for (let column = 0; column < input[row].length; column++) {
            if (input[row][column] === '^' && visited[column]) {
                sum++;
                visited[column] = false;
                visited[column - 1] = true;
                visited[column + 1] = true;
            }
        }
    }

    return sum;
}

const partTwo = input => {
    const visits = new Array(input[0].length).fill(0);
    const startingColumn = input[0].indexOf('S');
    visits[startingColumn] = 1;
    let sum = 1;
    for (let row = 0; row < input.length; row++) {
        for (let column = 0; column < input[row].length; column++) {
            if (input[row][column] === '^') {
                const timesVisited = visits[column];
                sum += timesVisited;
                visits[column] = 0;
                visits[column - 1] += timesVisited;
                visits[column + 1] += timesVisited;
            }
        }
    }

    return sum;
}



console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`)