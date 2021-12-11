import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day11.txt');

function anyHighItems(map:number[][]):boolean {
    //checks if there are any items that are higher than 9
    for (let i=1;i<map.length-1;i++) {
        for (let j=1;j<map[i].length-1;j++) {
            if (map[i][j] > 9) {
                return true;
            }
        }
    }
    return false;
}

function increaseNeighbors(m:number[][],i:number,j:number):number[][] {
    const neighbours:number[][] = [
        [-1, -1], [-1,  0], [-1,  1],
        [ 0, -1],           [ 0,  1],
        [ 1, -1], [ 1,  0], [ 1,  1],
    ];
    function inc(i:number,j:number):void {
        if (m[i][j] !== 0) { m[i][j]++; }
    }
    neighbours.forEach(n => {
        inc(i+n[0],j+n[1]);
    })
    return m;
}

function areWeStillRunning(part:number,step:number,m:number[][]):boolean {
    if (part === 1) {
        return (step < 100);
    }
    else {
        return (m.flat().reduce((a,b) => a+b) > 0);
    }
}

let inputMap:number[][] = inputArray
    .map(line => line.split(''))
    .map(function(l) { 
        return [0].concat(l.map(c => parseInt(c,10)),0); //add border of 0s so we don't need to check array boundaries
    })
;
inputMap.push([0,0,0,0,0,0,0,0,0,0,0,0]);
inputMap.unshift([0,0,0,0,0,0,0,0,0,0,0,0]);

let solution:number[] = new Array(3).fill(0); //keeping solutions, 1-indexed, so 0, then flashes, then steps
for (let part = 1; part <= 2; part++) {
    while (areWeStillRunning(part,solution[2],inputMap)) {

        //increase every item (within borders)
        for (let i=1;i<inputMap.length-1;i++) {
            for (let j=1;j<inputMap[i].length-1;j++) {
                inputMap[i][j]++;
            }
        }
        
        //as long as there are any items higher than 9, keep on flashing
        while (anyHighItems(inputMap)) {
            for (let i=1;i<inputMap.length-1;i++) {
                for (let j=1;j<inputMap[i].length-1;j++) {
                    if (inputMap[i][j] > 9) {
                        inputMap[i][j] = 0;
                        solution[1]++; //increase flash counter
                        inputMap = increaseNeighbors(inputMap,i,j);
                    }
                }
            }
        }

        solution[2]++; //this step is done
    }
    console.log(`Solution for part ${part}: ${solution[part]}`);
}