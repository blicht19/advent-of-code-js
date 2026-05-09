import { getFileContentsAsString, getFileNameArgument } from "library";

const fileName = getFileNameArgument();
const input = getFileContentsAsString(fileName)
    .split('\n\n');

const shapes = input.slice(0, input.length - 1).map(shape => {
    const [_, grid] = shape.split(':\n');
    const area = grid.split('').filter(char => char === '#').length;
    return area;
});

const gridAreas = input.at(-1).split('\n')
    .map(gridArea => {
        const [dimensions, counts] = gridArea.split(': ');
        const [width, height] = dimensions.split('x');
        const area = Number(width) * Number(height);
        const shapeCounts = counts.split(' ')
            .map(count => Number(count));
        return { area, shapeCounts }
    })


let total = 0;
gridAreas.forEach(({ area, shapeCounts }) => {
    let shapesArea = 0;
    shapeCounts.forEach((count, index) => {
        shapesArea += count * shapes[index];
    });

    if (area > shapesArea) {
        total++;
    }
});

console.log(total);