import {getFileNameArgument, getFileContentsAsArrayOfStrings} from "library";

const fileName = getFileNameArgument();
const contents = getFileContentsAsArrayOfStrings(fileName);

const partOne = (input) => {
    let dialLocation = 50;
    let timesAtZero = 0;

    input.forEach(rotation => {
        const direction = rotation[0];
        let distance = Number(rotation.slice(1));
        if (direction === 'L') {
            distance = -distance;
        }

        dialLocation = (dialLocation + distance) % 100;
        if (dialLocation === 0) {
            timesAtZero++;
        }
    })

    return timesAtZero;
}

const partTwo = (input) => {
    let dialLocation = 50;
    let timesPastZero = 0;

    input.forEach(rotation => {
        const direction = rotation[0];
        let distance = Number(rotation.slice(1));

        let distanceFromZero = distance;
        if (direction === 'L') {
            distance = -distance;
            distanceFromZero += (100 - dialLocation) % 100;
        } else {
            distanceFromZero += dialLocation;
        }

        timesPastZero += Math.floor(distanceFromZero / 100);
        dialLocation = (dialLocation + distance) % 100;
        if (dialLocation < 0) {
            dialLocation += 100;
        }
    })

    return timesPastZero;
}

console.log(`Part One: ${partOne(contents)}`);
console.log(`Part Two: ${partTwo(contents)}`);