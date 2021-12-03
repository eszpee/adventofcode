'use strict';
function sum(prev, curr) {
    return prev + curr;
}
function compare(arr) {
    return (arr.slice(1, 4).reduce(sum) > arr.slice(0, 3).reduce(sum));
}
function measurer2(line) {
    measures.push(parseInt(line));
    if (measures.length >= 4) {
        if (compare(measures)) {
            increases2++;
        }
        measures.shift();
    }
}
var measures = new Array();
var increases2 = 0;
require('fs').readFileSync('../input/day01.txt', 'utf-8').split(/\r?\n/).forEach(measurer2);
console.log(increases2);
