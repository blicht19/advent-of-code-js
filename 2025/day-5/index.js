import {getFileContentsAsString, getFileNameArgument} from "library";

const fileName = getFileNameArgument();
const [rangeSection, idSection] = getFileContentsAsString(fileName).split('\n\n');

const freshIngredientRanges = rangeSection.split('\n').map(range => {
    const [start, end] = range.split('-');
    return {
        start: Number(start),
        end: Number(end)
    }
}).sort((a, b) => a.start - b.start);

const valueIsInRange = (range, value) => {
    return value >= range.start && value <= range.end;
}

const combineRanges = (sortedRanges) => {
    const combinedRanges = [];
    let currentCombinedRange = sortedRanges[0];
    for (let i = 1; i < sortedRanges.length; i++) {
        const sortedRange = sortedRanges[i];
        if (valueIsInRange(currentCombinedRange, sortedRange.start) ||
            valueIsInRange(currentCombinedRange, sortedRange.end)) {
            currentCombinedRange.end = Math.max(currentCombinedRange.end, sortedRange.end);
            continue;
        }

        combinedRanges.push(currentCombinedRange);
        currentCombinedRange = sortedRange;
    }
    combinedRanges.push(currentCombinedRange);

    return combinedRanges;
}

const combinedRanges = combineRanges(freshIngredientRanges);
const ingredientIds = idSection.split('\n').map(id => Number(id));

const rangesIncludeValue = (ranges, value) => {
    for (const range of ranges) {
        if (valueIsInRange(range, value)) {
            return true;
        }
    }

    return false;
}

const partOne = (ranges, ids) => {
    let freshCount = 0;
    ids.forEach((id) => {
        if (rangesIncludeValue(ranges, id)) {
            freshCount++;
        }
    });

    return freshCount;
}


const partTwo = (ranges) => {
    let sum = 0;

    ranges.find(combinedRange => {
        sum += combinedRange.end - combinedRange.start + 1;
    });

    return sum;
}

console.log(`Part One: ${partOne(combinedRanges, ingredientIds)}`)
console.log(`Part Two: ${partTwo(combinedRanges)}`);