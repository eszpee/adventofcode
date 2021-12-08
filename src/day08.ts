import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day08.txt');
//['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'];
//['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | fcgedb cgb dgebacf gc'];
//readInputArray('../input/day08_sample.txt');

function is1478(s:string):boolean {
    //checks if the passed string represents 1,4,7 or 8 
    //by looking at the length of the string, as ONLY these digits require 2,4,3,7 segments respectively
    const goodLength = new Set([2,4,3,7]);
    return goodLength.has(s.length);
}
interface SegmentDecoder {
    [key: string]: string;
}

interface DigitDecoder {
    [key: string]: number;
}
const originalNumbers:DigitDecoder = {
    'abcefg': 0, 
    'cf': 1,
    'acdeg': 2,
    'acdfg': 3,
    'bcdf': 4,
    'abdfg': 5,
    'abdefg': 6,
    'acf': 7,
    'abcdefg': 8,
    'abcdfg': 9
};
function doMagic(s:string[]):SegmentDecoder {
    // deducts which segment represents which one and returns a segment lookup object
    function nLength(s:string[],n:number):string[] {
        //returns the items in s[] that have a length of n
        let r:string[] = new Array();
        s.forEach(i => {if (i.length === n) {r.push(i)}});
        return r;
    }

    function nonPresent(check:string[],reference?:string):string[] {
        //checks strings compared to reference
        //returns the characters that aren't present in any of the strings in 'check' from reference (or [abcdefg])
        const ref = reference || 'abcdefg';
        const checkMerged = check.join('');
        let np:string[] = new Array();
        ref.split('').forEach(chr => {if (!checkMerged.includes(chr)){np.push(chr);}});
        return np;
    }

    function otherOne(first:string,pair:string[]):string { 
        //takes an item and a two-item array and returns the other item from it
        return pair[1-pair.indexOf(first)];
    }

    function removeChars(chars:string[],s:string):string {
        //removes all chars[] characters from string and returns remainder
        const sArr = s.split('');
        chars.forEach(chr => sArr.splice(sArr.indexOf(chr),1).join(''));
        return sArr.join('');
    }

    let sd:SegmentDecoder = {};

    s = s.map(x=>x.split('').sort().join(''));

    const cf = nLength(s,2)[0].split(''); // the only 2-segment number is 1, so we have C or F

    const a = nonPresent(cf,nLength(s,3)[0])[0];
    sd['a'] = a; // the only 3-segment number is 7, that includes C and F, so the remainder is A

    //get the string that's 5-char long and includes ACF... 
    let three = '';
    let acf = [a,...cf];
    nLength(s,5).forEach(string => {
        let contains = 0;
        acf.forEach(chr => {if (string.match(chr)){contains++}});
        if (contains === 3) {
            three = string;
        }
    });
    //... and if we remove ACF then we have DG
    let dg = removeChars(acf,three).split('');

    //get the string that's 4-char long (only one:4) and check which one of DG isn't in it => that should be D
    const four = nLength(s,4)[0];
    let d = '';
    four.split('').forEach(chr => {
        if (dg.indexOf(chr) !== -1) {
            d = chr;
        }
    });
    sd['d'] = d;
    //...if we have G from DG then D is the other one
    let g = otherOne(d,dg);
    sd['g'] = g;
    //...also if we have the digit 4(BCDF), we can remove CF and D to get B
    const fourArr:string[] = four.split('');
    let dcf = [d,...cf];
    let b = removeChars(dcf,four);
    sd['b'] = b;

    // take one of the 6-segment digits (from 0, 6, 9) that DOESN'T have D => it should be 0...
    let zero = '';
    nLength(s,6).forEach(string => {
        if (!string.match(d)) {
            zero = string;
        }
    });
    //...and if we remove ABG and CF from 0, the only segment left is E
    let abgcf = [a,b,g,...cf];
    let e = removeChars(abgcf,zero);
    sd['e'] = e;

    // take one of the 6-segment digits (from 0, 6, 9) that has all of have ABDEG => it should be 6...
    let six = '';
    nLength(s,6).forEach(string => {
        if (string.match(a) && string.match(b) && string.match(d) && string.match(e) && string.match(g)) {
            six = string;
        }
    });
    //...and if we remove ABDEG from 6, the only segment left is F
    let abdeg = [a,b,d,e,g];
    let f = removeChars(abdeg,six);
    sd['f'] = f;

    //If we have F from CF then C is the other one
    let c = otherOne(f,cf);
    sd['c'] = c;

    return sd;
}

function decodeNumber(s:string[],decipher:DigitDecoder):number {
    //decodes a number from segment descriptions ['afbcd', 'ef', ...] with 'decipher' decoder, and returns corresponding number
    const sSorted = s.map(onestring => onestring.split('').sort().join('')); 
    return parseInt(sSorted.map(number => decipher[number]).join(''),10);
}

//LOAD INPUTS
const inputPatterns:string[][] = new Array();
const inputDigits:string[][] = new Array();
inputArray.forEach(oneline => {
        const thisLine = oneline.split(' | ');
        inputPatterns.push(thisLine[0].split(' '));
        inputDigits.push(thisLine[1].split(' '));
    }
);

//SOLUTION FOR FIRST PART
let numberOfUniques = 0;
inputDigits.forEach(oneline => {
    oneline.forEach(oneitem => {
        if (is1478(oneitem)) { numberOfUniques++; }
    })
});
console.log(`First part: ${numberOfUniques} unique length segmentlists.`);

//SOLUTION FOR SECOND PART
let sum = 0;
for (let line = 0;line<inputPatterns.length;line++) {
    const segmentDecoder = doMagic(inputPatterns[line]);    //get the decipher for the current puzzle
    const decipher:DigitDecoder = {};                       //create a lookup object for the decipher
    Object.keys(originalNumbers).forEach(key => {
        decipher[
            key.split('')
            .map(c => segmentDecoder[c])
            .sort()
            .join('')
        ] = originalNumbers[key];
    });
    sum += decodeNumber(inputDigits[line],decipher);        //and decode the numbers with it
}
console.log("Second part, sum of all numbers:",sum);
