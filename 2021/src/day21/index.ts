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


const threeThrowScores = [  
    //1
    3,  4,  5,
    4,  5,  6,
    5,  6,  7,

    //2
    4,  5,  6,
    5,  6,  7,
    6,  7,  8,

    //3
    5,  6,  7,
    6,  7,  8,
    7,  8,  9
];

/* game will end when someone reaches 21 points 
max score in every round is 9 (3*3)
min score in every round is 3 (1*3)
start position is key for winning
sample start positions: p1:4, p2:8
round1: p1 starts, makes 9 points, p1score: 13
p2 continues
round2: p1 makes 9 points, gets to 22, wins
questions:
1. how many dice throws led to winning score (in this case, one of the rounds can be 2 or 3 too!)
- 1st round: 3
- 2nd player: 6
- 2nd round p1: 9
2. how many extra universes were spawn during these throws?

IDEA:
 - let's count that in how many universes has player 1 score of 1, 2, 3, 4, etc., 
    and only increase the number of universes after each round
    data structure: [Nan, 0, 0, 0, 3, 9], etc for each player

- actually there are only 3x3 dice throws, p1 starts, gets 9 points max, p2's turn, universes increase, p1 comes again, and wins
- actually, no, there are lot of universes where she doesn't win damn it
- the longest game is if everyone throws 1s and in this case with a start point at "8", there are 5 rounds for p1, 4 for p2 aargh

1st round 1st half: p1 threw 3 times, of the 27 universes, player1s scores:
p1scr	in universes
    3	1
    4	3
    5	6
    6	7
    7	6
    8	3
    9	1


    */
let universes = 1;
const newUniversesPerRound = 3*3*3 * 3*3*3;
for (let rounds = 1; rounds <=7; rounds++) {
    console.log(`round number: ${rounds}, universes: ${universes}`);
    universes = universes * newUniversesPerRound;
}
const sampleUniverses = 786316482957123;
