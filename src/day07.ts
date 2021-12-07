import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day07_sample.txt');

const average = Math.round(
    inputArray[0]
        .split(',')
        .map(s=>parseInt(s,10))
        .reduce((prev, curr) => prev+curr) 
    / inputArray[0].length);

console.log(`Point to get to: ${average}`);

const cumulativeDistanceFromAverage = inputArray[0]
    .split(',')
    .map(x => Math.abs(average - parseInt(x,10)))
    .reduce((p,c) => p+c);

console.log(`Combined fuel needed to get there: ${cumulativeDistanceFromAverage}`);