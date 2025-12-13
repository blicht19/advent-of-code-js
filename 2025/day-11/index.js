import {getFileContentsAsArrayOfStrings, getFileNameArgument} from "library";

const fileName = getFileNameArgument();
const input = getFileContentsAsArrayOfStrings(fileName);
const connections = new Map();
input.forEach(line => {
    const [device, connectionString] = line.split(': ');
    const connectedDevices = connectionString.split(' ');
    connections.set(device, connectedDevices);
});

const partOne = (connections) => {
    const cache = new Map();
    const visited = new Set();

    const countPathsToOut = (device) => {
        if (device === 'out') {
            return 1;
        }

        if (visited.has(device)) {
            const pathCount = cache.get(device);
            return pathCount ?? 0;
        }

        visited.add(device);

        let pathCount = 0;
        const connectedDevices = connections.get(device);
        connectedDevices.forEach(connectedDevice => {
            pathCount += countPathsToOut(connectedDevice);
        });

        cache.set(device, pathCount);
        return pathCount;
    }

    return countPathsToOut('you');
}

const partTwo = (connections) => {
    const cache = new Map();
    const visited = new Set();

    const countPathsToOut = (state) => {
        if (state.device === 'out') {
            if (state.visitedDac && state.visitedFft) {
                return 1;
            }

            return 0;
        }

        const key = JSON.stringify(state);
        if (visited.has(key)) {
            const pathCount = cache.get(key);
            return pathCount ?? 0;
        }

        visited.add(key);

        const visitedDac = state.visitedDac || state.device === 'dac';
        const visitedFft = state.visitedFft || state.device === 'fft';

        let pathCount = 0;
        const connectedDevices = connections.get(state.device);
        connectedDevices.forEach(connectedDevice => {
            const newState = {
                visitedDac,
                visitedFft,
                device: connectedDevice
            };
            pathCount += countPathsToOut(newState);
        });

        cache.set(key, pathCount);
        return pathCount;
    }

    return countPathsToOut({
        device: 'svr',
        visitedDac: false,
        visitedFft: false
    });
}

console.log(`Part One: ${partOne(connections)}`);
console.log(`Part Two: ${partTwo(connections)}`);