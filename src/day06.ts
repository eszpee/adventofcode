import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day06.txt');

let schoolOfFish:number[] = inputArray[0].split(',').map(x=>parseInt(x,10));

for (let day = 1; day<=80;day++) {
    let currentFishNumber = schoolOfFish.length
    if (day < 11) { console.log(`After ${day} day(s): ${schoolOfFish}`) };
    for (let fish = 0; fish < currentFishNumber; fish++) {
        if (schoolOfFish[fish] === 0) {
            schoolOfFish.push(8);
            schoolOfFish[fish] = 6;
        }
        else {
            schoolOfFish[fish]--;
        }
    }
}

console.log(schoolOfFish.length);

