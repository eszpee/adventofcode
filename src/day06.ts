import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day06_sample.txt');
const daysToCheck = 256;

let fishString:string = inputArray[0].split(',').join('');
console.log(`Initial state: ${fishString}`);

for (let day = 1; day<=daysToCheck;day++) {
    let currentFishNumber = fishString.length
    for (let fish = 0; fish < currentFishNumber; fish++) {
        if (parseInt(fishString.charAt(fish),10) === 0) {
            fishString+='8';
            fishString = fishString.substring(0,fish) + '6' + fishString.substring(fish+1);
        }
        else {
            fishString = fishString.substring(0,fish) + (parseInt(fishString.charAt(fish),10)-1) + fishString.substring(fish+1);
        }
    }
    if (day < 11) { console.log(`After ${day} day(s): ${fishString}`); } else {console.log(`We're at day ${day}`);};
}

console.log(fishString.length);

