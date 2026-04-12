import { getFileContentsAsArrayOfStrings, getFileNameArgument } from "library";

const fileName = getFileNameArgument();
const lines = getFileContentsAsArrayOfStrings(fileName);

const junctionBoxes = lines.map((line) => line.split(',').map(coordinate => Number.parseInt(coordinate, 10)));

const distance = (a, b) => {
    const [x1, y1, z1] = a;
    const [x2, y2, z2] = b;

    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
}

const distances = [];
for (let i = 0; i < junctionBoxes.length; i++) {
    for (let j = i + 1; j < junctionBoxes.length; j++) {
        distances.push([i, j, distance(junctionBoxes[i], junctionBoxes[j])])
    }
}
distances.sort((a, b) => a[2] - b[2]);

const initializeCurcuits = () => {
    const circuits = [];
    for (let i = 0; i < junctionBoxes.length; i++) {
        circuits.push([i]);
    }

    return circuits;
}

const findCircuitForCoordinateIndex = (circuits, coordinateIndex) => circuits.findIndex((circuit) => circuit.indexOf(coordinateIndex) >= 0);

const joinCircuits = (circuits, distanceIndex) => {
    const circuitIndexOne = findCircuitForCoordinateIndex(circuits, distances[distanceIndex][0])
    const circuitIndexTwo = findCircuitForCoordinateIndex(circuits, distances[distanceIndex][1]);

    if (circuitIndexOne >= 0 && circuitIndexTwo >= 0 && circuitIndexOne != circuitIndexTwo) {
        circuits[circuitIndexOne] = circuits[circuitIndexOne].concat(circuits[circuitIndexTwo]);
        circuits.splice(circuitIndexTwo, 1);
    }
}

const partOne = () => {
    const NUM_PAIRS = 1000;

    const circuits = initializeCurcuits();

    for (let i = 0; i < NUM_PAIRS; i++) {
        joinCircuits(circuits, i);
    }

    circuits.sort((a, b) => b.length - a.length);

    return circuits[0].length * circuits[1].length * circuits[2].length;
}

const partTwo = () => {
    const circuits = initializeCurcuits();

    let i = 0;
    while (true) {
        joinCircuits(circuits, i);

        if (circuits.length === 1) {
            return junctionBoxes[distances[i][0]][0] * junctionBoxes[distances[i][1]][0];
        }

        i++;
    }
}

console.log(`Part One: ${partOne()}`);
console.log(`Part Two: ${partTwo()}`);