const MAXITER = 2;

import {dot2bin, enhance, deepCopy, cropImage, bin2dec, litPixels} from './day20_utils';
import { readInputArray } from "../inputfile";

let inputArray:string[] = readInputArray('../../input/day20.txt'); 

let algo = inputArray.shift() || '';
algo = dot2bin(algo);

inputArray.shift(); //empty line

for (let i=0;i<inputArray.length;i++) {
    inputArray[i] = dot2bin(inputArray[i]);
}

let flipFlop = '0'
for (let i=1;i<=MAXITER;i++) {
    console.log(`iteration number ${i}`);
    inputArray = enhance(inputArray,algo,flipFlop);
    flipFlop = ''+(1-parseInt(flipFlop,10));    
}

let numPix = litPixels(inputArray);

console.log(`Number of pixels lit: ${numPix}`);

