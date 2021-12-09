import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day09.txt');

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


function secondPart(inputMap:number[][]):number {

    function numToBitmap(numMap:number[][]):boolean[][] {
        let returnMap:boolean[][] = new Array(numMap.length).fill(undefined).map(()=>Array(numMap[0].length).fill(true));
        for (let y=0;y<numMap.length;y++) {    
            for (let x=0;x<numMap[y].length;x++) {
                    if (numMap[y][x] === 9) {
                        returnMap[y][x] = false;
                    }
            }
        }
        return returnMap;
    }

    function floodFill(x:number,y:number,currSize:number = 0):number {
        // Implements flood fill algorythm on bitMap, starting from position (x;y), as long as there are 'true' items around it.
        // returns the size of the area that was filled.
        if (bitMap[y][x]) {
            //current point can be filled
            bitMap[y][x] = false;
            currSize++; 

            //check point above
            if (y>0) {
                currSize = floodFill(x,y-1,currSize);
            } 

            //check point below
            if (y<bitMap.length-1) {
                currSize = floodFill(x,y+1,currSize);
            } 

            //check point left
            if (x>0) {
                currSize = floodFill(x-1,y,currSize);
            } 

            //check point right
            if (x<bitMap[0].length-1) {
                currSize = floodFill(x+1,y,currSize);
            } 
        }
        return currSize;
    }

    const bitMap = numToBitmap(inputMap)

    let sizeArr:number[] = new Array;
    for (let y=0;y<bitMap.length;y++) {    
        for (let x=0;x<bitMap[y].length;x++) {
            sizeArr.push(floodFill(x,y));
        }
    }

    return sizeArr.sort((a,b) => b-a).slice(0,3).reduce((curr,prev) => curr *= prev);
}

const inputMap = inputArray.map(line => line.split('').map(digit => parseInt(digit,10)));

console.log(`solution to first part is: ${firstPart(inputMap)}`);
console.log(`solution to second part is: ${secondPart(inputMap)}`);