import { readInputArray } from "./inputfile";
import { inspect } from 'util';
import path from "path/posix";
const ITERMAX=600000;
let inputArray:string[] = // readInputArray('../input/day15.txt'); /*
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

]; // */

const origMap = inputArray.map(line => line.split('').map(Number));
const mapSize = origMap.length;
const emptyMap:boolean[][] = new Array(mapSize).fill(undefined).map(undefined => new Array(mapSize).fill(false));

class toDo {
    startCoord: number[]; 
    visitedSoFar: boolean[][];
    sumSoFar: number;
    constructor(start:number[],sumSoFar:number,visitedSoFar:boolean[][]) {
        this.startCoord = start;
        this.sumSoFar = 0;
        this.visitedSoFar = emptyMap;
    }
}

function drawVisited(visitedMap:boolean[][]):string {
    let canvas = '';
    for (let i=0;i<visitedMap.length;i++) {
        for (let j=0;j<visitedMap.length;j++) {
            if (visitedMap[i][j]) { canvas += 'X'} else {canvas += '.'}
        }
        canvas += '\n';
    }
    return canvas;
}

let stack:toDo[] = new Array();
stack.push(new toDo([0,0],0,emptyMap)); //let's start from top left corner

const goodPaths:number[] = new Array();
let steps = 1;

while ((stack.length>0) && (steps <= ITERMAX)) {
//    console.log('-----STEP',steps);
//    console.log("stack length and contents before pop()",stack.length,inspect(stack,{depth: 3, colors: true}))
    const bestPath = goodPaths.sort((a,b) => a-b)[0] || Infinity;
    steps++;
    let currToDo = JSON.parse(JSON.stringify(stack.pop()));
    let newSum = currToDo?.sumSoFar || 0;
    let visitedMap = JSON.parse(JSON.stringify(currToDo?.visitedSoFar));
    const x =  currToDo?.startCoord[0];
    const y =  currToDo?.startCoord[1];
    if (!visitedMap[x][y] && (newSum < bestPath)) {
        visitedMap[x][y] = true;
        newSum += origMap[x][y];
        if ((x===mapSize-1) && (y===mapSize-1)) {
            console.log("arrived to end at step",steps,"sum:",newSum);
            console.log("path taken:");
            console.log(drawVisited(visitedMap));
            goodPaths.push(newSum);
        }    
        else {
            let newTodo = new toDo([0,0],newSum,visitedMap);
            newTodo.sumSoFar = newSum;
            newTodo.visitedSoFar = JSON.parse(JSON.stringify(visitedMap));
            //up
            if (x>0) {
                if (!visitedMap[x-1][y]) {
                    newTodo.startCoord = [x-1,y];
//                    console.log("up, pushing:",newTodo);
                    stack.push(JSON.parse(JSON.stringify(newTodo)));
//                    console.log("stack length and contents after push()",stack.length,inspect(stack,{depth: 3, colors: true}))
                }
            }
            //right
            if (y<mapSize-1) {
                if (!visitedMap[x][y+1]) {
                    newTodo.startCoord = [x,y+1];
                    stack.push(JSON.parse(JSON.stringify(newTodo)));
                }
            }
            //left
            if (y>0) {
                if (!visitedMap[x][y-1]) {
                    newTodo.startCoord = [x,y-1];
                    stack.push(JSON.parse(JSON.stringify(newTodo)));
                }
            }
            //down
            if (x<mapSize-1) {
                if (!visitedMap[x+1][y]) {
                    newTodo.startCoord = [x+1,y];
                    stack.push(JSON.parse(JSON.stringify(newTodo)));
                }
            }
        }
    }
}

console.log("Solution to first part:",goodPaths.sort((a,b) => a-b)[0]-origMap[0][0]);
