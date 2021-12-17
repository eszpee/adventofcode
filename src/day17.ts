import { readInputArray } from "./inputfile";
let inputArray:string[] = //readInputArray('../input/day14.txt'); 
['target area: x=20..30, y=-10..-5'];

const regex = /-?\d+/g;
const targetArea:number[] = inputArray[0].match(regex)?.map(Number);
const targetMin = [targetArea[0],targetArea[1]]; 
const targetMax = [targetArea[2],targetArea[3]]; 

function shoot(x:number,y:number): number {
    let path:number[][] = [];
    let xpos=0; 
    let ypos=0;
    while (ypos > targetMax[1]) {
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
    else { return -1; }
}

console.log(shoot(7,2));
console.log(shoot(6,3));
console.log(shoot(9,0));
console.log(shoot(17,-4));
console.log(shoot(6,9));
