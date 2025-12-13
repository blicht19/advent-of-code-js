import {getFileContentsAsArrayOfStrings, getFileNameArgument} from "library";

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