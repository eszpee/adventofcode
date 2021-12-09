import { readInputArray } from "./inputfile";
const inputArray:string[] = 
[
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678'
]
|| readInputArray('../input/day09_sample.txt');

const inputMap = inputArray.map(line => line.split('').map(digit => parseInt(digit,10)));
console.log(inputMap);