import {dot2bin, enhance, deepCopy, cropImage, bin2dec, litPixels} from './day20_utils';
import { readInputArray } from "../inputfile";

let inputArray:string[] = readInputArray('../../input/day20.txt'); 

let algo = inputArray.shift() || '';
algo = dot2bin(algo);

inputArray.shift(); //empty line

for (let i=0;i<inputArray.length;i++) {
    inputArray[i] = dot2bin(inputArray[i]);
}

inputArray = cropImage(inputArray);

console.log('input data');
console.log(inputArray);
console.log(`size: ${inputArray.length}x${inputArray[0].length}`);

console.log('after first iteration');
let firstIter = enhance(inputArray,algo,'0');
console.log(firstIter);
console.log(`size: ${firstIter.length}x${firstIter[0].length}`);
console.log('after second iteration');
let secondIter = enhance(firstIter,algo,'1');
console.log(secondIter);
console.log(`size: ${secondIter.length}x${secondIter[0].length}`);

let numPix = litPixels(secondIter);

console.log(`Number of pixels lit: ${numPix}`);

