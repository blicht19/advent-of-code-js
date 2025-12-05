import {getFileContentsAs2DCharacterArray, getFileNameArgument, getNeighbors} from "library";

const fileName = getFileNameArgument();
const contents = getFileContentsAs2DCharacterArray(fileName);

const ROLL_CHARACTER = '@';

const isRoll = (character) => character === ROLL_CHARACTER;
const isAccessible = (grid, row, column) => {
    return getNeighbors(grid, row, column, true).filter(neighbor => isRoll(neighbor)).length < 4
};

const removeAccessibleRolls = (grid, replacementCharacter = ROLL_CHARACTER) => {
    let rollsRemoved = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!isRoll(grid[i][j])) {
                continue;
            }

            if (isAccessible(grid, i, j)) {
                rollsRemoved++;
                grid[i][j] = replacementCharacter;
            }
        }
    }

    return rollsRemoved;
}

const partOne = (grid) => removeAccessibleRolls(grid);

const partTwo = (grid) => {
    let accessibleRolls = 0;
    let rollsRemoved = 0;
    do {
        rollsRemoved = removeAccessibleRolls(grid, '.');
        accessibleRolls += rollsRemoved;
    } while (rollsRemoved > 0);

    return accessibleRolls;
}

console.log(`Part One: ${partOne(contents)}`);
console.log(`Part Two: ${partTwo(contents)}`);