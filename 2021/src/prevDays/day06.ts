import { readInputArray } from "../inputfile";
const inputArray:string[] = readInputArray('../input/day06.txt');
const daysToCheck = 256;

let fishes = new Array(9).fill(0);

inputArray[0].split(',').forEach(x => fishes[parseInt(x,10)]++);

for (let day=1;day<=daysToCheck;day++) {
    let fishesTomorrow = new Array(9).fill(0);
    for (let fish=0;fish <= 8;fish++){
        if (fish === 0 ) {
            fishesTomorrow[6] += fishes[0];
            fishesTomorrow[8] += fishes[0];
        }
        else {
            fishesTomorrow[fish-1] += fishes[fish];
        }
    }
    fishes = fishesTomorrow;
} 

console.log(fishes.reduce((acc, num) => acc+num,0));