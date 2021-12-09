import { debug } from "console";
import { readInputArray } from "./inputfile";
const inputArray:string[] = 
 [
    '2199943210',
    '3987894921',
    '9856789892',
    '8767896789',
    '9899965678'
] ||
readInputArray('../input/day09.txt');

function firstPart(map:number[][]):number {
    function isMin(center:number, top:number, bottom:number, left:number, right:number):boolean {
        return ((center<top) && (center<bottom) && (center<left) && (center<right));
    }

    let minSum = 0;
    for (let y=0;y<map.length;y++) {    
        for (let x=0;x<map[y].length;x++) {
            let left = (x === 0) ? Infinity : map[y][x-1];
            let right =  (x === map[y].length-1) ? Infinity : map[y][x+1];
            let top = (y === 0) ? Infinity : map[y-1][x];
            let bottom = (y === map.length-1) ? Infinity : map[y+1][x];
            if (isMin(map[y][x], top, bottom, left, right)) {
                minSum += 1+map[y][x];
            }  
        }
    }
    return minSum;
}

function secondPart(inputMap:number[][]) {

}

const inputMap = inputArray.map(line => line.split('').map(digit => parseInt(digit,10)));

console.log(`solution to first part is: ${firstPart(inputMap)}`);