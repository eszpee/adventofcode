"use strict";
exports.__esModule = true;
var inputfile_1 = require("./inputfile");
function measurer(curr, index) {
    var depth = parseInt(curr);
    if (depth > parseInt(inputArray[index - 1], 10)) {
        increases++;
    }
    return depth;
}
;
var increases = 0;
var inputArray = (0, inputfile_1.readInputArray)('../input/day01.txt');
inputArray.forEach(measurer);
console.log(increases);
