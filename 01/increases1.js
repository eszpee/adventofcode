'use strict';
const measurer = (line) => {
    let depth = parseInt(line);
    if ((prev != undefined) && (depth > prev)) {
        increases++;
    }
    prev = depth;
};

let increases = 0;
let prev = undefined;

require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/01/input.txt', 'utf-8').split(/\r?\n/).forEach(measurer);

console.log(increases);