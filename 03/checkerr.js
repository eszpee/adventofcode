'use strict';
var input = new Array();
input = require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/03/input.txt', 'utf-8').split(/\r?\n/);
var sum = new Array(input[0].length).fill(0);
for (var i = 0; i < input.length; i++) {
    var line = input[i].split('');
    line.forEach(function (digit, index) { sum[index] += parseInt(digit); });
}
var result = '';
sum.forEach(function (item) {
    if (item < (input.length / 2)) {
        result += '0';
    }
    else {
        result += '1';
    }
});
var errs = parseInt(result, 2);
var inv = errs ^ Math.pow(2, input[0].length) - 1;
console.log(errs * inv);
