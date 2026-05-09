import { getCombinations, getFileContentsAsArrayOfStrings, getFileNameArgument } from "library";
import { init } from 'z3-solver';

const fileName = getFileNameArgument();

const input = getFileContentsAsArrayOfStrings(fileName).map(line => {
    const sections = line.split(' ');
    const lightDiagram = sections[0].slice(1, sections[0].length - 1)
        .split('')
        .map(light => light === '#');
    const schematics = sections.slice(1, sections.length - 1)
        .map(schematic => schematic.slice(1, schematic.length - 1)
            .split(',')
            .map(value => Number.parseInt(value)));
    const joltages = sections.at(-1)
        .slice(1, sections.at(-1).length - 1)
        .split(',')
        .map(value => Number.parseInt(value));

    return { lightDiagram, schematics, joltages }
});

const partOne = (machines) => {
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

    let presses = 0;
    machines.forEach((machine) => {
        presses += getNumPressesNeeded(machine);
    })

    return presses;
}

// Cheating and using z3 as many online suggested
const partTwo = async (machines) => {
    const sumOf = (operands) => {
        let sum = operands[0];
        for (let i = 1; i < operands.length; i++) {
            sum = sum.add(operands[i]);
        }

        return sum;
    }

    const { Context } = await init();
    let presses = 0;
    for (const machine of machines) {
        const { schematics, joltages } = machine;
        const { Optimize, Int } = new Context('main');
        const optimize = new Optimize();

        const variables = [];
        for (let i = 0; i < schematics.length; i++) {
            const variable = Int.const(`n${i}`)
            optimize.add(variable.ge(0));
            variables.push(variable);
        }

        joltages.forEach((joltage, i) => {
            let sum = [];
            schematics.forEach((schematic, j) => {
                if (schematic.includes(i)) {
                    sum.push(variables[j]);
                }
            });

            optimize.add(sumOf(sum).eq(joltage));
        });

        optimize.minimize(sumOf(variables));

        await optimize.check();
        const model = optimize.model();
        presses += Number(model.eval(sumOf(variables)).value());
    }


    return presses;
}

console.log(`Part One: ${partOne(input)}`)
const solution = await partTwo(input);
console.log(`Part Two: ${solution}`);