'use strict';
var input = new Array();
input = require('fs').readFileSync('../input/day03.txt', 'utf-8').split(/\r?\n/);
var sums = new Array(input[0].length).fill(0);
for (var i = 0; i < input.length; i++) {
    var line = input[i].split('');
    line.forEach(function (digit, index) { sums[index] += parseInt(digit); });
}
var result = '';
sums.forEach(function (item) {
    if (item < (input.length / 2)) {
        result += '0';
    }
    else {
        result += '1';
    }
});
//console.log(sum,result);
var errs = parseInt(result, 2);
var inv = errs ^ Math.pow(2, input[0].length) - 1;
console.log(errs * inv);
