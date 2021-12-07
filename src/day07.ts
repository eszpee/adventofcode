import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day07_sample.txt');
const positions = inputArray[0].split(',').map(s=>parseInt(s,10));
function calculateFuel(items:number[],target:number):number {
    //calculates the combined fuel needed for all items in ${positions} to get to ${target}
    return items
        .map(item => Math.abs(target-item))
        .reduce((p,c) => p+c);
}
function arrayMax(arr:number[]):number {
    //return max item of array
    return arr.reduce((prev,curr) => Math.max(prev,curr));
}
function arrayMin(arr:number[]):number {
    //return min item of array
    return arr.reduce((prev,curr) => Math.min(prev,curr));
}

const average = Math.round(
    positions.reduce((prev, curr) => prev+curr) 
    / 
    positions.length
);

const distances:number[] = new Array();
for (let i=0;i<=arrayMax(positions);i++) {
    const dist = calculateFuel(positions,i);
//    console.log(`Target is ${i}, combined fuel needed to get there: `,dist);
    distances.push(dist);
}

console.log("Fuel needed to get to target: ",arrayMin(distances));

