import {readFileSync} from 'fs';

export const getFileNameArgument = () => {
    if (process.argv.length < 3) {
        console.error('Requires input file name as argument');
        process.exit(1);
    }

    return process.argv[2];
}

export const getFileContentsAsString = (filePath) => {
    return readFileSync(filePath).toString();
}