import { readInputArray } from "./inputfile";
let inputArray:string[] = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`.split('\n');
//readInputArray('../input/day13.txt'); 
interface Dict {
    [key: string]: string;
};
interface Freq {
    [key: string]: number;
};

function pairInsert(letters:string,rules:Dict):string {
    return letters.charAt(0)+rules[letters]+letters.charAt(1);
}

function frequencies(str:string):Freq {
    let freq:Freq = {};
    for (let i=0;i<str.length;i++) {
        if (freq[str.charAt(i)]) {
            freq[str.charAt(i)]++;
        }
        else {
            freq[str.charAt(i)] = 1;
        }
    }
    return freq;
}

let str:string = inputArray.shift() || '';
inputArray.shift();

const dictionary:Dict = {};
inputArray.forEach(cmd => {
    const fromTo = cmd.split(' -> ');
    dictionary[fromTo[0]] = fromTo[1];
});

new Array(10).fill(undefined).forEach(cmd => {
    let newString:string = '';
    for(let pos=0;pos<str.length-1;pos++) {
        const pairToCheck = str.charAt(pos)+str.charAt(pos+1);
        // last character should be removed unless we're at the last iteration
        if (pos === str.length-2) {
            newString += pairInsert(pairToCheck,dictionary);
        }
        else {
            newString += pairInsert(pairToCheck,dictionary).slice(0, -1); 
        }
    }
    str = newString;
});

const freq = frequencies(str);
const freqValuesSorted = Object.values(freq).sort(function(a,b){return b-a});
console.log("Solution to first part:",(freqValuesSorted.shift()||0)-(freqValuesSorted.pop()||0));

