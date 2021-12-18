import { readInputArray } from "./inputfile";
let inputArray:string[] = //readInputArray('../input/day14.txt'); 
['target area: x=192..251, y=-89..-59'];
//['target area: x=20..30, y=-10..-5'];

const regex = /-?\d+/g;
const targetArea:number[] = inputArray[0].match(regex)?.map(Number);
const targetMin = [targetArea[0],targetArea[1]]; 
const targetMax = [targetArea[2],targetArea[3]]; 

function shoot(x:number,y:number): number {
    let path:number[][] = [];
    let xpos=0; 
    let ypos=0;
    while (ypos+100 > targetMax[1]) { //just some ugly bruteforce to ensure we're checking a long enough trajectory
        xpos += x;
        ypos += y;
        if (x > 0) {x--;} 
        else if (x<0) {x++;}
        y--;
        path.push([xpos,ypos]);
    }
    let hit = false;
    let ymax = ypos;
    path.forEach(coord => {
        if ((coord[0]>=targetMin[0]) && (coord[0]<=targetMin[1]) 
        && (coord[1]>=targetMax[0]) && (coord[1]<=targetMax[1])) {
            hit = true;
        }
        if (coord[1] > ymax) {
            ymax = coord[1];
        }
    });
    if (hit) { return ymax; }
    else { return -Infinity; }
}

let yMax = -Infinity;
let goodShots = 0;
for (let vx=-500;vx<500;vx++) {
    for (let vy=-500;vy<500;vy++) {
        const sh = shoot(vx,vy);
        if (sh > -Infinity) {
            if (sh > yMax) {yMax = sh;}
            goodShots++;
        }
    }
}
console.log('The highest I could get was',yMax);
console.log('Number of good shots were',goodShots);