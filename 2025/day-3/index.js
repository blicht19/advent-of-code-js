import {getFileContentsAsArrayOfStrings, getFileNameArgument} from "library";

const fileName = getFileNameArgument();
const contents = getFileContentsAsArrayOfStrings(fileName);

const findLargestPossibleJoltage = (battery, numberOfDigits) => {
    const digits = new Array(numberOfDigits).fill(0);

    for (let i = 0; i < battery.length; i++) {
        const currentDigit = Number(battery[i]);
        for (let j = 0; j < numberOfDigits; j++) {
            if (currentDigit > digits[j] && (battery.length - i) >= (numberOfDigits - j)) {
                digits[j] = currentDigit;
                digits.fill(0, j + 1);
                break;
            }
        }
    }

    return Number(digits.join(''));
}

const getTotalJoltage = (batteries, numberOfDigits) => {
    let sum = 0;
    for (const battery of batteries) {
        sum += findLargestPossibleJoltage(battery, numberOfDigits);
    }

    return sum;
}

console.log(`Part One: ${getTotalJoltage(contents, 2)}`);
console.log(`Part Two: ${getTotalJoltage(contents, 12)}`);