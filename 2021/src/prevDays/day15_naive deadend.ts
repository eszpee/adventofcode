const start = new Date();
import { readInputArray } from "../inputfile";
import { inspect } from 'util';

const ITERMAX=Infinity;//100000000;
const MAXLENGTH=5;//path max length is n times map width
let inputArray:string[] =  // readInputArray('../input/day15.txt'); /*
 [
    '1163751742',
    '1381373672',
    '2136511328',
    '3694931569',
    '7463417111',
    '1319128137',
    '1359912421',
    '3125421639',
    '1293138521',
    '2311944581',
];
// */
/*     '113599',
    '724879',
    '817659',
    '321979',
    '444569',
    '999991',
 
]; // */

const origMap = inputArray.map(line => line.split('').map(Number));
const mapSize = origMap.length;
let easyPath = origMap[mapSize-1].reduce((prev, current) => {return prev+current});
for (let i=0;i<mapSize;i++) {
    easyPath += origMap[0][i];
}
easyPath -= origMap[0][0];
class toDo {
    startCoord: number[]; 
    visitedSoFar: number[][];
    sumSoFar: number;
    constructor(start:number[],sumSoFar:number,visitedSoFar:number[][]) {
        this.startCoord = start;
        this.sumSoFar = sumSoFar;
        this.visitedSoFar = visitedSoFar;
    }

}

function ArrIncl(arr:number[][], subarr:number[]){
    for(var i = 0; i<arr.length; i++){
        let checker = false
        for(var j = 0; j<arr[i].length; j++){
            if(arr[i][j] === subarr[j]){
                checker = true
            } else {
                checker = false
                break;
            }
        }
        if (checker){
            return true
        }
    }
    return false
}

function pathLength(map:number[][]):number {
    return map.length;
}

function drawVisited(visitedMap:number[][]):string {
    let canvas = '';
    for (let i=0;i<mapSize;i++) {
        for (let j=0;j<mapSize;j++) {
            if (ArrIncl(visitedMap,[i,j])) { canvas += 'X'} else {canvas += '.'} 
        }
        canvas += '\n';
    }
    return canvas;
}

let stack:toDo[] = new Array();
stack.push(new toDo([0,0],0,[])); //let's start from top left corner

const goodPaths:number[] = new Array();
let steps = 1;

while ((stack.length>0) && (steps <= ITERMAX)) {
    const bestPath = goodPaths.sort((a,b) => a-b)[0] || easyPath;
    if (steps % 100000 === 0) {
        //sort stack 
        stack = stack.sort((a,b) => (a.sumSoFar) - (b.sumSoFar));
        console.log('-----STEP',steps);
        console.log('Stack size:',stack.length, "Shortest path:",bestPath);

//        console.log(drawVisited(stack[stack.length-1].visitedSoFar));
        console.log("length:",pathLength(stack[stack.length-1].visitedSoFar));
   };
//    console.log("stack length and contents before pop()",stack.length,inspect(stack,{depth: 3, colors: true}))
    steps++;

    // let currToDo = JSON.parse(JSON.stringify(stack.pop()));
    let currToDo = Object.assign({}, stack.pop());
    let newSum = currToDo?.sumSoFar || 0;
    let visitedMap = currToDo?.visitedSoFar;
    const x =  currToDo?.startCoord[0];
    const y =  currToDo?.startCoord[1];
    if (!ArrIncl(visitedMap,[x,y]) && (newSum <= bestPath-origMap[mapSize-1][mapSize-1])) {// && (pathLength(visitedMap) <= mapSize*MAXLENGTH)) { 
        visitedMap.push([x,y]);
        newSum += origMap[x][y];
        if ((x===mapSize-1) && (y===mapSize-1)) {
            console.log("arrived to end at step",steps,"sum:",newSum);
            console.log("path taken:");
            console.log(drawVisited(visitedMap));
            goodPaths.push(newSum);
        }    
        else {
            let newTodoList = new Array();
            let newTodo = new toDo([0,0],0,[]);
            let objToPush;
            newTodo.sumSoFar = newSum;
            newTodo.visitedSoFar = visitedMap;

/*              //up
             if (x>0) {
                if (!ArrIncl(visitedMap,[x-1,y])) {
                    let up = new toDo([x-1,y],0,[]);
                    up.sumSoFar = newSum;
                    up.visitedSoFar = visitedMap;
                    newTodoList.push(up);
                }
            }
            //left
            if (y>0) {
                if (!ArrIncl(visitedMap,[x,y-1])) {
                    let left = new toDo([x,y-1],0,[]);
                    left.sumSoFar = newSum;
                    left.visitedSoFar = visitedMap;
                    newTodoList.push(left);
                }
            }
 */            //right
            if (y<mapSize-1) {
                if (!ArrIncl(visitedMap,[x,y+1])) {
                    newTodo.startCoord = [x,y+1];
                    newTodoList.push(JSON.parse(JSON.stringify(newTodo)));
                }
            }
            //down
            if (x<mapSize-1) {
                if (!ArrIncl(visitedMap,[x+1,y])) {
                    newTodo.startCoord = [x+1,y];
                    newTodoList.push(newTodo);
                }
            }
            stack.push(...newTodoList.sort((a,b) => origMap[b.startCoord[0]][b.startCoord[1]] - origMap[a.startCoord[0]][a.startCoord[1]]));
        }
    }
}

console.log("Solution to first part:",goodPaths.sort((a,b) => a-b)[0]-origMap[0][0]);
//const end = new Date() - start;
//console.log('Execution time: %dms', end)