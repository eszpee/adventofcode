'use strict';
let input = new Array();
input = require('fs').readFileSync('../input/day03.txt', 'utf-8').split(/\r?\n/);
let sums = new Array(input[0].length).fill(0);
for (let i:number = 0; i<input.length; i++) {
    let line:string[] = input[i].split('');
    line.forEach((digit:string, index:number) => {sums[index]+= parseInt(digit);})
}
let result:string = '';
sums.forEach((item:number) => {
    if (item < (input.length/2)) {
        result += '0';
    } else {
        result += '1';
    }
});
//console.log(sum,result);
const errs:number = parseInt(result,2);
const inv:number = errs^Math.pow(2,input[0].length)-1;
console.log(errs*inv);
