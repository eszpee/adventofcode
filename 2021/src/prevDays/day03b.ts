'use strict';
function filterMost(array: string[][], position: number):string[][] {
    let mostcommon:string;
    let sumAtPos:number = 0;
    array.forEach((line:string[]) => {if (line[position] === '1') {sumAtPos++;}})
    if (sumAtPos >= (array.length/2)) {
        mostcommon = '1';
    }
    else {
        mostcommon = '0';
    }
    console.log(mostcommon);

    let filtered:string[][];
    filtered = array.filter((line:string[]) => {if (line[position] === mostcommon) { return true;}})
    return filtered;
}

function filterLeast(array: string[][], position: number):string[][] {
    let leastcommon:string;
    let sumAtPos:number = 0;
    array.forEach((line:string[]) => {if (line[position] === '1') {sumAtPos++;}})
    if (sumAtPos >= (array.length/2)) {
        leastcommon = '0';
    }
    else {
        leastcommon = '1';
    }
    console.log(leastcommon);

    let filtered:string[][];
    filtered = array.filter((line:string[]) => {if (line[position] === leastcommon) { return true;}})
    return filtered;
}


let inputMatrix: string[][];
inputMatrix = require('fs').readFileSync('../input/day03.txt', 'utf-8').split(/\r?\n/).map((x:string) => {return x.split('');})
console.log(inputMatrix);

let currentMatrix = inputMatrix;
let iterator:number = 0;
while (currentMatrix.length > 1) { //we could check for iterator going through the whole array and still having more than 1 item but we expect input data to be _nice_
    currentMatrix = filterMost(currentMatrix,iterator);
    iterator++;
    console.log(currentMatrix);
}
let oxygen:number = parseInt(currentMatrix[0].join(''),2);

currentMatrix = inputMatrix;
iterator = 0;
while (currentMatrix.length > 1) { //we could check for iterator going through the whole array and still having more than 1 item but we expect input data to be _nice_
    currentMatrix = filterLeast(currentMatrix,iterator);
    iterator++;
    console.log(currentMatrix);
}
let co2:number = parseInt(currentMatrix[0].join(''),2);

console.log(oxygen);
console.log(co2);
console.log(oxygen*co2);

