console.log('what if we branch');
import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day07.txt');
const positions = inputArray[0].split(',').map(s=>parseInt(s,10));
function calculateConstantFuel(items:number[],target:number):number {
    //calculates the combined fuel needed for all items in ${positions} to get to ${target}
    return items
        .map(item => Math.abs(target-item))
        .reduce((p,c) => p+c);
}
function calculateExponentialFuel(items:number[],target:number):number {
    //calculates the combined fuel needed for all items in ${positions} to get to ${target}
    let sum = 0;
    for (let i=0;i<items.length;i++) {
        //iterate all items 
        const item = items[i];
        const distance = Math.abs(item-target);
        const steps = distance * ((distance + 1) / 2);
        sum += steps;
    }
    return sum;
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

const distancesConst:number[] = new Array();
for (let i=0;i<=arrayMax(positions);i++) {
    const dist = calculateConstantFuel(positions,i);
//    console.log(`Target is ${i}, combined fuel needed to get there: `,dist);
    distancesConst.push(dist);
}

const distancesExp:number[] = new Array();
for (let i=0;i<=arrayMax(positions);i++) {
    const dist = calculateExponentialFuel(positions,i);
//    console.log(`Target is ${i}, combined fuel needed to get there: `,dist);
    distancesExp.push(dist);
}

console.log("Constant burning fuel needed to get to target: ",arrayMin(distancesConst));
console.log("Exponential burning fuel needed to get to target: ",arrayMin(distancesExp));

