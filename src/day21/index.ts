import { advance, throwPracticeDie } from './day21_utils';
import { readInputArray } from "../inputfile";

let inputArray:string[] = readInputArray('../../input/day21.txt'); 
let p1pos = parseInt((inputArray.shift() || '').split(': ')[1],10);
let p2pos = parseInt((inputArray.shift() || '').split(': ')[1],10);

let p1score = 0;
let p2score = 0;
let prevThrow = 0;
const turns:string[] = ['p1','p2'];let turn = 0;
let allThrows = 0;

while ((p1score<1000) && (p2score<1000)) {
    if (turns[turn] === 'p1') {
        console.log('p1 turn');
        let dieSum = 0;
        for (let throws = 1; throws <=3; throws++) {
            allThrows++;
            prevThrow = throwPracticeDie(prevThrow);
            console.log("threw ",prevThrow);
            dieSum += prevThrow;
        }
        let newpos = advance(p1pos,dieSum);
        console.log(`stepping from ${p1pos} ${dieSum} steps`);
        p1pos = newpos;
        p1score += newpos;
        console.log(`New score: ${p1score}`);
    }
    else if (turns[turn] === 'p2') {
        console.log('p2 turn');
        let dieSum = 0;
        for (let throws = 1; throws <=3; throws++) {
            allThrows++;
            prevThrow = throwPracticeDie(prevThrow);
            console.log("threw ",prevThrow);
            dieSum += prevThrow;
        }
        let newpos = advance(p2pos,dieSum);
        console.log(`stepping from ${p2pos} ${dieSum} steps`);
        p2pos = newpos;
        p2score += newpos;
        console.log(`New score: ${p2score}`);
    }
    turn = 1-turn; //0 then 1 then 0 etc
}

const loser = p1score < p2score? p1score:p2score;
console.log(`Answer to first part: ${loser * allThrows}`);