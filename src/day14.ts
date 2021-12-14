import { readInputArray } from "./inputfile";
let inputArray:string[] = /* `NNCB

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
*/
readInputArray('../input/day14.txt'); 

function inc(a:number|undefined,b:number=1):number {
    if (a) { return a+b; } else {return b;}
}
interface Dict {
    [key: string]: string;
};
interface Freq {
    [key: string]: number;
};

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

function pairsToSingles(pairs:Freq,first:string,last:string):Freq {
    //returns single character frequencies from pairs
    let freq:Freq = {};
    Object.keys(pairs).forEach(pair =>{
        freq[pair.charAt(0)] = inc(freq[pair.charAt(0)],pairs[pair]);
        freq[pair.charAt(1)] = inc(freq[pair.charAt(1)],pairs[pair]);
    });
    //add 1 to ends...
    freq[first]++;
    freq[last]++;
    //...and divide everything by 2 because we counted all chars twice
    Object.keys(freq).forEach(letter =>{
        freq[letter] = freq[letter] / 2;
    });
    return freq;
}


const inputString:string = inputArray.shift() || '';
const first = inputString.charAt(0);
const last = inputString.charAt(inputString.length-1);

inputArray.shift(); //empty line separator in input file

const dictionary:Dict = {};
inputArray.forEach(cmd => {
    const fromTo = cmd.split(' -> ');
    dictionary[fromTo[0]] = fromTo[1];
});

//initialize pairs and singles
let pairs:Freq = {};
for (let i=0;i<inputString.length-1;i++) {
    pairs[inputString.charAt(i)+inputString.charAt(i+1)] = inc(pairs[inputString.charAt(i)+inputString.charAt(i+1)]);
}
let singles:Freq = pairsToSingles(pairs,first,last);

//loop n times
for (let steps=1;steps<=10;steps++) {
    let newPairs:Freq = {};
    Object.keys(pairs).forEach(pair =>{
        //create new pairs
        const c1 = pair.charAt(0);
        const c2 = dictionary[pair];
        const c3 = pair.charAt(1);
        newPairs[c1+c2] = inc(newPairs[c1+c2],pairs[pair]);
        newPairs[c2+c3] = inc(newPairs[c2+c3],pairs[pair]);
    });
    pairs = newPairs;
    console.log(steps,". step, pairs after step:",pairs);
    singles = pairsToSingles(pairs,first,last);
    console.log("Singles:",singles);    
};

const singlesSorted = Object.values(singles).sort(function(a,b){return b-a});
console.log("Solution to first part:",(singlesSorted.shift()||0)-(singlesSorted.pop()||0));

