import { readInputArray } from "./inputfile";
const inputArray:string[] = [
    '5483143223',
    '2745854711',
    '5264556173',
    '6141336146',
    '6357385478',
    '4167524645',
    '2176841721',
    '6882881134',
    '4846848554',
    '5283751526'];
//readInputArray('../input/day11.txt');

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

let inputMap:number[][] = inputArray
    .map(line => line.split(''))
    .map(function(l) { 
        return [0].concat(l.map(c => parseInt(c,10)),0); //add border of 0s so we don't need to check array boundaries
    })
;
inputMap.push([0,0,0,0,0,0,0,0,0,0,0,0]);
inputMap.unshift([0,0,0,0,0,0,0,0,0,0,0,0]);

console.log(inputMap.join('\n'));

let flashes:number = 0;

for (let step = 1;step<=100;step++) {
    console.log(`step ${step}`);

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
                    flashes++;
                    inputMap = increaseNeighbors(inputMap,i,j);
                }
            }
        }
    }

    console.log(inputMap.join('\n'));
    console.log(`flashes so far: ${flashes}`);
}

