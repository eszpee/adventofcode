'use strict';
function compare(arr) {
    let sum1=0;
    let sum2=0;
    for (let i=0; i<=2; i++) {
        sum1 += arr[i];
    }
    for (let i=1; i<=3; i++) {
        sum2 += arr[i];
    }
    if (sum2 > sum1) {
        return true;
    }
    else {
        return false;
    }

} 

let measures = new Array();
let increases = 0;

require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/01/input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    measures.push(parseInt(line));
    if (measures.length >= 4) {
        if (compare(measures)) {
            increases++;
        }
        measures.shift();
    }
});

console.log(increases);