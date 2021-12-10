import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day10.txt');
/* ['[({(<(())[]>[[{[]{<()<>>',
    '[(()[<>])]({[<{<<[]>>(',
    '{([(<{}[<>[]}>{[]{[(<()>',
    '(((({<>}<{<{<>}{[]{[]{}',
    '[[<[([]))<([[{}[[()]]]',
    '[{[{({}]{}}([{[{{{}}([]',
    '{<[[]]>}<{[{[{[]{()[[[]',
    '[<(<(<(<{}))><([]([]()',
    '<{([([[(<>()){}]>(<<{{',
    '<{([{{}}[<[[[<>{}]]]>[]]'];
 */// readInputArray('../input/day10.txt');

interface Chunks {
    [key: string]: string;
}
const CHUNKS:Chunks =  {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
};

interface Scores {
    [key: string]: number;
}
const SCORES:Scores =  {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};



function firstPart(input:string[]):number {
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
            sumOfIllegals+=SCORES[illegals[0]];
        }
    });
    return sumOfIllegals;
}

console.log('Solution for first part:',firstPart(inputArray));
