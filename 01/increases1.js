'use strict';
const measurer = (prev,curr) => {
    let depth = parseInt(curr);
    if (depth > parseInt(prev)) {
        increases++;
    }
    return depth;
};

let increases = 0;

require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/01/input.txt', 'utf-8').split(/\r?\n/).reduce(measurer);

console.log(increases);