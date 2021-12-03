'use strict';
function filterMost(array, position) {
    var mostcommon;
    var sumAtPos = 0;
    array.forEach(function (line) { if (line[position] === '1') {
        sumAtPos++;
    } });
    if (sumAtPos >= (array.length / 2)) {
        mostcommon = '1';
    }
    else {
        mostcommon = '0';
    }
    console.log(mostcommon);
    var filtered;
    filtered = array.filter(function (line) { if (line[position] === mostcommon) {
        return true;
    } });
    return filtered;
}
function filterLeast(array, position) {
    var leastcommon;
    var sumAtPos = 0;
    array.forEach(function (line) { if (line[position] === '1') {
        sumAtPos++;
    } });
    if (sumAtPos >= (array.length / 2)) {
        leastcommon = '0';
    }
    else {
        leastcommon = '1';
    }
    console.log(leastcommon);
    var filtered;
    filtered = array.filter(function (line) { if (line[position] === leastcommon) {
        return true;
    } });
    return filtered;
}
var inputMatrix;
inputMatrix = require('fs').readFileSync('../input/day03.txt', 'utf-8').split(/\r?\n/).map(function (x) { return x.split(''); });
console.log(inputMatrix);
var currentMatrix = inputMatrix;
var iterator = 0;
while (currentMatrix.length > 1) { //we could check for iterator going through the whole array and still having more than 1 item but we expect input data to be _nice_
    currentMatrix = filterMost(currentMatrix, iterator);
    iterator++;
    console.log(currentMatrix);
}
var oxygen = parseInt(currentMatrix[0].join(''), 2);
currentMatrix = inputMatrix;
iterator = 0;
while (currentMatrix.length > 1) { //we could check for iterator going through the whole array and still having more than 1 item but we expect input data to be _nice_
    currentMatrix = filterLeast(currentMatrix, iterator);
    iterator++;
    console.log(currentMatrix);
}
var co2 = parseInt(currentMatrix[0].join(''), 2);
console.log(oxygen);
console.log(co2);
console.log(oxygen * co2);
