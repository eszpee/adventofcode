import {doExplode, doSplit, doReduce, addList, magnitude, isNum} from './day18_utils';
import { readInputArray } from "../inputfile";

let inputArray:string[] = readInputArray('../../input/day18.txt'); 

console.log("Solution for first part:",magnitude(addList(inputArray)));