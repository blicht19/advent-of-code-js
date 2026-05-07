import { getCombinations, getFileContentsAsArrayOfStrings, getFileNameArgument } from "library";

const fileName = getFileNameArgument();
const input = getFileContentsAsArrayOfStrings(fileName);

const getMachines = (input) => input.map(line => {
    const sections = line.split(' ');
    const lightDiagram = sections[0].slice(1, sections[0].length - 1)
        .split('')
        .map(light => light === '#');
    const schematics = sections.slice(1, sections.length - 1)
        .map(schematic => schematic.slice(1, schematic.length - 1)
            .split(',')
            .map(value => Number.parseInt(value)));

    return { lightDiagram, schematics }
});

const pressButtons = (lightDiagram, schematics) => {
    const lights = new Array(lightDiagram.length).fill(false);
    schematics.forEach(schematic => {
        schematic.forEach(lightIndex => {
            lights[lightIndex] = !lights[lightIndex];
        })
    });

    for (let i = 0; i < lightDiagram.length; i++) {
        if (lightDiagram[i] !== lights[i]) {
            return false;
        }
    }

    return true;
}

const getNumPressesNeeded = (machine) => {
    for (let i = 1; i <= machine.schematics.length; i++) {
        const combos = getCombinations(machine.schematics, i);
        for (const combo of combos) {
            if (pressButtons(machine.lightDiagram, combo)) {
                return i;
            }
        }
    }
}

const partOne = (input) => {
    const machines = getMachines(input);
    let presses = 0;
    machines.forEach((machine) => {
        presses += getNumPressesNeeded(machine);
    })

    return presses;
}

console.log(`Part One: ${partOne(input)}`)