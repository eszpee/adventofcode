'use strict';
let input = new Array();
input = require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/03/input_small.txt', 'utf-8').split(/\r?\n/);
let sum = new Array(input[0].length).fill(0);
for (let i:number = 0; i<input.length; i++) {
    let line:string[] = input[i].split('');
    line.forEach((digit:string, index:number) => {sum[index]+= parseInt(digit);})
}
let result:string = '';
sum.forEach((item:number) => {
    if (item < (input.length/2)) {
        result += '0';
    } else {
        result += '1';
    }
});
console.log(sum,result);
const errs:number = parseInt(result,2);
const inv:number = errs^Math.pow(2,input[0].length)-1;
console.log(errs*inv);
