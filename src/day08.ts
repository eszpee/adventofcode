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
const numbers:DigitDecoder = {
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
    const LOG=false;
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

    let sd:SegmentDecoder = { //this will be filled up runtime
        'd': 'X',//'A',
        'e': 'X',//'B',
        'a': 'X',//'C',
        'f': 'X',//'D',
        'g': 'X',//'E',
        'b': 'X',//'F',
        'c': 'X',//'G',
    };

    s = s.map(x=>x.split('').sort().join(''));

    const cf = nLength(s,2)[0].split(''); // the only 2-segment number is 1, only with two segments on the right side
    if (LOG) console.log("C or F",cf); // we have C or F

    const a = nonPresent(cf,nLength(s,3)[0])[0];
    if (LOG) console.log("A: ",a); // the only 3-segment number is 7, that includes C and F, so the remainder is A
    sd['a'] = a;

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
    if (LOG) console.log("D or G",dg);

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
    sd['d'] = d;
    if (LOG) console.log("D: ",d);
    //...if we have G from DG then D is the other one
    let g = dg[1-dg.indexOf(d)];
    sd['g'] = g;
    if (LOG) console.log("G: ",g);
    //...also if we have 4(BCDF), we can remove CF and D to get B
    const fourArr:string[] = four.split('');
    let dcf = [d,...cf];
    dcf.forEach(chr => fourArr.splice(fourArr.indexOf(chr),1));
    let b = fourArr[0];
    sd['b'] = b;
    if (LOG) console.log("B: ",b);


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
    sd['e'] = e;
    if (LOG) console.log("E: ",e);

    // take one of the 6-segment digits (from 0, 6, 9) that has all of have ABDEG => it should be 6...
    let six = '';
    s.forEach(string => {
        if ((string.length === 6) && string.match(a) && string.match(b) && string.match(d) && string.match(e) && string.match(g)) {
            six = string;
        }
    });
    //...and if we remove ABDEG from 6, the only segment left is F
    const sixArr:string[] = six.split('');
    let abdeg = [a,b,d,e,g];
    abdeg.forEach(chr => sixArr.splice(sixArr.indexOf(chr),1));
    let f = sixArr[0];
    sd['f'] = f;
    if (LOG) console.log("F: ",f);
    //...if we have F from CF then C is the other one
    let c = cf[1-cf.indexOf(f)];
    sd['c'] = c;
    if (LOG) console.log("C: ",c);


    if (LOG) console.log(sd);

    return sd;
}

function decodeNumber(s:string[],num:DigitDecoder):number {
    //decodes a number from segment descriptions ['afbcd', 'ef', ...] with num lookup decoder, and returns corresponding number
    const LOG = false;
    let sSorted = s.map(onestring => onestring.split('').sort().join(''));
    if(LOG) console.log(num,sSorted);
    return parseInt(sSorted.map(number => num[number]).join(''),10);
}


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

let sum = 0;
for (let line = 0;line<inputPatterns.length;line++) {
    const segmentDecoder = doMagic(inputPatterns[line]); 
    let newNumbers:DigitDecoder = {};
    for (var key in numbers) {
        let keyArr = key.split('');
        let newArr = keyArr.map(c => segmentDecoder[c]);
        let newKey = newArr.sort().join('').toLowerCase();
        newNumbers[newKey] = numbers[key];
    }
    
    let finalNumber = decodeNumber(inputDigits[line],newNumbers);
    sum +=finalNumber;
    console.log(finalNumber);
}
console.log("Final number:",sum);
