'use strict';
import { readInputArray } from "./inputfile"

function measurer(curr:string, index:number) {
    let depth = parseInt(curr);
    if (depth > parseInt(inputArray[index-1],10)) {
        increases++;
    }
    return depth;
};

let increases = 0;

const inputArray = readInputArray('../input/day01.txt');
inputArray.forEach(measurer);

console.log(increases);