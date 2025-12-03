import {getFileContentsAsString, getFileNameArgument} from "library";

const fileName = getFileNameArgument();
const contents = getFileContentsAsString(fileName).split(',');

const ranges = contents.map(range => {
    const [start, end] = range.split('-');

    return {
        start: Number(start),
        end: Number(end)
    }
});

const splitStringIntoSequences = (string, sequenceLength) => {
    const sequences = [];
    for (let i = 0; i < string.length; i += sequenceLength) {
        sequences.push(string.slice(i, i + sequenceLength));
    }

    return sequences;
}

const containsRepeatingSequence = (id, sequenceLength) => {
    const sequences = splitStringIntoSequences(id, sequenceLength);
    return sequences.every(sequence => sequence === sequences[0]);
}

const partOne = (input) => {
    let sum = 0;

    for (const range of input) {
        for (let i = range.start; i <= range.end; i++) {
            const id = i.toString();
            if (id.length % 2 !== 0) {
                continue;
            }

            if (containsRepeatingSequence(id, id.length / 2)) {
                sum += i;
            }
        }
    }

    return sum;
}

const partTwo = (input) => {
    let sum = 0;

    for (const range of input) {
        for (let i = range.start; i <= range.end; i++) {
            const id = i.toString();
            const midPoint = Math.floor(id.length / 2);
            for (let j = midPoint; j >= 1; j--) {
                if (id.length % j !== 0) {
                    continue;
                }

                if (containsRepeatingSequence(id, j)) {
                    sum += i;
                    break;
                }
            }
        }
    }

    return sum;
}


console.log(`Part One: ${partOne(ranges)}`);
console.log(`Part Two: ${partTwo(ranges)}`);

