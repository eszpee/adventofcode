import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day08_sample.txt');
const inputPatterns:string[][] = new Array();
const inputDigits:string[][] = new Array();
inputArray.forEach(oneline => {
        const thisLine = oneline.split(' | ');
        inputPatterns.push(thisLine[0].split(' '));
        inputDigits.push(thisLine[1].split(' '));
    }
);

console.log(inputPatterns,inputDigits);