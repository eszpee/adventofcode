'use strict';
function measurer(prev:string, curr:string): number {
    let depth = parseInt(curr);
    if (depth > parseInt(prev)) {
        increases++;
    }
    return depth;
};

let increases = 0;

require('fs').readFileSync('../input/day01.txt', 'utf-8').split(/\r?\n/).reduce(measurer);

console.log(increases);