import { readInputArray } from "./inputfile";
const inputArray:string[] = ['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'];
//['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'];
//readInputArray('../input/day08.txt');
const inputPatterns:string[][] = new Array();
const inputDigits:string[][] = new Array();
inputArray.forEach(oneline => {
        const thisLine = oneline.split(' | ');
        inputPatterns.push(thisLine[0].split(' '));
        inputDigits.push(thisLine[1].split(' '));
    }
);

function is1478(s:string):boolean {
    //checks if the passed string represents 1,4,7 or 8 
    //by looking at the length of the string, as ONLY these digits require 2,4,3,7 segments respectively
    const goodLength = new Set([2,4,3,7]);
    return goodLength.has(s.length);
}

let numberOfUniques = 0;
inputDigits.forEach(oneline => {
    oneline.forEach(oneitem => {
        if (is1478(oneitem)) { numberOfUniques++; }
    })
});
console.log(`${numberOfUniques} unique length segmentlists.`);

const numbers = {
    'ABCEFG': 0, 
    'CF': 1,
    'ACDEG': 2,
    'ACDFG': 3,
    'BCDF': 4,
    'ABDFG': 5,
    'ABDEFG': 6,
    'ACF': 7,
    'ABCDEFG': 8,
    'ABCDFG': 9,
};

function doMagic(s:string[]) {
    // deducts which segment represents which one 
    let sd = { //TODO: this will need to be filled up runtime
        'd': 'A',
        'e': 'B',
        'a': 'C',
        'f': 'D',
        'g': 'E',
        'b': 'F',
        'c': 'G',
    };
    return sd;
}

function decodeNumber(s:string[],d):number {
    //decodes a number from segment descriptions ['afbcd', 'ef', ...] with d decoder, and returns corresponding number
    let decodedNumber = s
        .map(onestring => onestring.split('')
            .map(onechar => d[onechar])
                .sort().join('')
        ).map(onestring => numbers[onestring])
            .join('');
    return parseInt(decodedNumber,10);
}

//const segmentDecoder = doMagic(inputPatterns[0]); //TODO: this should be a loop

let finalNumbers:number[] = inputDigits.map((digit,index) => decodeNumber(digit,doMagic(inputPatterns[index])));
console.log(finalNumbers);

