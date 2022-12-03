import { readInputArray } from "../inputfile";
const inputArray:string[] = readInputArray('../input/day07_sample.txt');
const positions = inputArray[0].split(',').map(s=>parseInt(s,10));

function calculateConstantFuel(items:number[],target:number):number {
    //calculates the combined constant fuel needed for all items in ${positions} to get to ${target}
    return items
        .map(item => Math.abs(target-item))
        .reduce((p,c) => p+c);
}
function calculateExponentialFuel(items:number[],target:number):number {
    //calculates the combined exponential fuel needed for all items in ${positions} to get to ${target}
    return items
        .map(item => Math.abs(item-target) * ((Math.abs(item-target) + 1) / 2))
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

console.log("Constant burning fuel needed to get to target: ",
    arrayMin(
        positions.map(i => calculateConstantFuel(positions,i))
    )
);

console.log("Exponential burning fuel needed to get to target: ",
    arrayMin(
        positions.map(i => calculateExponentialFuel(positions,i))
    )
);

//TODO: fix calculations
