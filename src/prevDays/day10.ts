import { readInputArray } from "../inputfile";
const inputArray:string[] = readInputArray('../input/day10.txt');
interface Scores {
    [key: string]: number;
}
interface Chunks {
    [key: string]: string;
}
const CHUNKS:Chunks =  {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
};

function firstPart(input:string[]):number {
    const SCORES_1:Scores =  {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    let sumOfIllegals:number = 0;
    input.forEach(line => {
        let stack:string[] = new Array(); //stack to implement opening/closing validation
        let illegals:string[] = new Array(); //array to store illegals (we will only need the first at first part)
        line.split('')
            .forEach(chr => {
                if (Object.keys(CHUNKS).includes(chr)) { //openers
                    stack.push(chr);
                }
                else if (Object.values(CHUNKS).includes(chr)) { //closers
                    const last:string|undefined = stack.pop() || '';
                    if (CHUNKS[last] !== chr) {
                        illegals.push(chr);
                    }
                }
            });
        if (illegals.length>0) {
            sumOfIllegals+=SCORES_1[illegals[0]];
        }
    });
    return sumOfIllegals;
}

function secondPart(input:string[]):number {
    const SCORES_2:Scores =  {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    };
    function middleValue(input:number[]):number {
        //sorts inputs and returns the one that's in the middle
        return (input.sort((a,b) => a-b)[(input.length-1)/2]);
    }

    let lineScores:number[] = new Array();

    input.forEach(line => {
        let stack:string[] = new Array(); //stack to implement opening/closing validation
        let illegals:string[] = new Array(); //array to store illegals 
        line.split('')
            .forEach(chr => {
                if (Object.keys(CHUNKS).includes(chr)) { //openers
                    stack.push(chr);
                }
                else if (Object.values(CHUNKS).includes(chr)) { //closers
                    const last:string|undefined = stack.pop() || '';
                    if (CHUNKS[last] !== chr) {
                        illegals.push(chr);
                    }
                }
            });
        if (illegals.length>0) {
            ;//line is illegal, can be ignored
        }
        else if (stack.length > 0) {
            //line is incomplete
            const closerStack:string[] = stack.reverse().map(item => CHUNKS[item]);
            const closerStackScores:number[] = closerStack.map(chr => SCORES_2[chr]);
            const closerScore:number = closerStackScores.reduce((p,c) => p*5+c);
            lineScores.push(closerScore);
        }
        else {
            ;//line has no mistakes, can be ignored 
        }
    }); 
    return middleValue(lineScores);
}

console.log('Solution for first part:',firstPart(inputArray));
console.log('Solution for second part:',secondPart(inputArray));
