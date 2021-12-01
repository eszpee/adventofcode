'use strict';
const sum = (prev,curr) => prev+curr;

function compare(arr) {
    return (arr.slice(1,4).reduce(sum) > arr.slice(0,3).reduce(sum));
} 

const measurer = (line) => {
    measures.push(parseInt(line));
    if (measures.length >= 4) {
        if (compare(measures)) {
            increases++;
        }
        measures.shift();
    }
};

let measures = new Array();
let increases = 0;

require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/01/input.txt', 'utf-8').split(/\r?\n/).forEach(measurer);

console.log(increases);