'use strict';


require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/01/input.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    let depth = parseInt(line);
    if ((prev != undefined) && (depth > prev)) {
        increases++;
    }
    prev = depth;
});

console.log(increases);