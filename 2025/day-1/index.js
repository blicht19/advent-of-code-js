import {getFileNameArgument, getFileContentsAsString} from "library";

const fileName = getFileNameArgument();
const contents = getFileContentsAsString(fileName);
console.log(contents);