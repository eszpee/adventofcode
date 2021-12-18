'use strict';
function add(prev: number, curr: number): number {
    return prev + curr;
}

function compare(arr:number[]): boolean {
    return (arr.slice(1,4).reduce(add) > arr.slice(0,3).reduce(add));
} 

function measurer2(line: string): void {
    measures.push(parseInt(line));
    if (measures.length >= 4) {
        if (compare(measures)) {
            increases2++;
        }
        measures.shift();
    }
}

let measures = new Array();
let increases2 = 0;

require('fs').readFileSync('../input/day01.txt', 'utf-8').split(/\r?\n/).forEach(measurer2);

console.log(increases2);