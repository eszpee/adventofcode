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
//console.log(`First part: ${numberOfUniques} unique length segmentlists.`);

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
interface SegmentDecoder {
    [key: string]: string;
}

function doMagic(s:string[]):SegmentDecoder {
    // deducts which segment represents which one 
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

    let sd:SegmentDecoder = { //TODO: this will need to be filled up runtime
        'd': 'X',//'A',
        'e': 'X',//'B',
        'a': 'X',//'C',
        'f': 'X',//'D',
        'g': 'X',//'E',
        'b': 'X',//'F',
        'c': 'X',//'G',
    };

    s = s.map(x=>x.split('').sort().join(''));
    //console.log(s);

    const cf = nLength(s,2)[0].split(''); // the only 2-segment number is 1, only with two segments on the right side
    console.log("C or F",cf); // we have C or F

    const a = nonPresent(cf,nLength(s,3)[0])[0];
    console.log("A: ",a); // the only 3-segment number is 7, that includes C and F, so the remainder is A
    sd[a] = 'A';

    //get the string that's 5-char long and includes ACF... 
    let three = '';
    let acf = [a,...cf];
    s.forEach(string => {
        if (string.length === 5) {
            let contains = 0;
            acf.forEach(chr => {if (string.match(chr)){contains++}});
            if (contains === 3) {
                three = string;
            }
        }
    });
    //... and if we remove ACF then we have DG
    const threeArr:string[] = three.split('');
    acf.forEach(chr => threeArr.splice(threeArr.indexOf(chr),1));
    let dg = threeArr;
    console.log("D or G",dg);

    //get the string that's 4-char long (only one:4) and check which one of DG isn't in it => that should be D
    let four = ''
    s.forEach(string => {
        if (string.length === 4) {four = string;}
    })
    let d = '';
    four.split('').forEach(chr => {
        if (dg.indexOf(chr) !== -1) {
            d = chr;
        }
    });
    sd[d] = 'D';
    console.log("D: ",d);
    //...if we have G from DG then D is the other one
    let g = dg[1-dg.indexOf(d)];
    sd[g] = 'G';
    console.log("G: ",g);
    //...also if we have 4(BCDF), we can remove CF and D to get B
    const fourArr:string[] = four.split('');
    let dcf = [d,...cf];
    dcf.forEach(chr => fourArr.splice(fourArr.indexOf(chr),1));
    let b = fourArr[0];
    sd[b] = 'B'
    console.log("B: ",b);


    // take one of the 6-segment digits (from 0, 6, 9) that DOESN'T have D => it should be 0...
    let zero = '';
    s.forEach(string => {
        if ((string.length === 6) && (!string.match(d))) {
            zero = string;
        }
    });
    //...and if we remove ABG and CF from 0, the only segment left is E
    const zeroArr:string[] = zero.split('');
    let abgcf = [a,b,g,...cf];
    abgcf.forEach(chr => zeroArr.splice(zeroArr.indexOf(chr),1));
    let e = zeroArr[0];
    sd[e] = 'E'
    console.log("E: ",e);

    // take one of the 6-segment digits (from 0, 6, 9) that has all of have ABDEG => it should be 6...
    let six = '';
    s.forEach(string => {
        if ((string.length === 6) && string.match(a) && string.match(b) && string.match(d) && string.match(e) && string.match(g)) {
            six = string;
        }
    });
    //...and if we remove ABDEG from 6, the only segment left is F
    const sixArr:string[] = zero.split('');
    let abdeg = [a,b,d,e,g];
    abdeg.forEach(chr => sixArr.splice(sixArr.indexOf(chr),1));
    let f = sixArr[0];
    sd[f] = 'F'
    console.log("F: ",f);
    //...if we have F from CF then C is the other one
    let c = cf[1-cf.indexOf(f)];
    sd[c] = 'C';
    console.log("C: ",c);


    console.log(sd);

    return sd;
}

function decodeNumber(s:string[],d:SegmentDecoder):number {
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
//console.log(finalNumbers);

