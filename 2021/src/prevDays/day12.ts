import { start } from 'repl';
import { inspect } from 'util';
import { readInputArray } from "../inputfile";
let inputArray:string[] = 
[
    'fs-end',
    'he-DX',
    'fs-he',
    'start-DX',
    'pj-DX',
    'end-zg',
    'zg-sl',
    'zg-pj',
    'pj-he',
    'RW-he',
    'fs-DX',
    'pj-RW',
    'zg-RW',
    'start-pj',
    'he-WI',
    'zg-he',
    'pj-fs',
    'start-RW'
/* 
'start-A',
'start-b',
'A-c',
'A-b',
'b-d',
'A-end',
'b-end' */
];
// readInputArray('../input/day11.txt');

/* CAVE DATA */
let tunels = inputArray.map(item => item.split('-'));
tunels = tunels.concat(tunels.map(v => [v[1],v[0]])); //nondirectional graph, need to add reverse paths too
console.log("tunels:",tunels);


function getCombinations2(chars:string[],max:number):string[] {
    function matches(s1:string,s2:string):boolean {
        const last = s1.split('-').pop();
        const first = s2.split('-')[0];
        return (last === first);
    }
    var result:string[] = [];
    if (max === 1) {
        return chars;
    }
    else {
        let subresult = getCombinations2(chars,max-1);
        for (let i=0;i<subresult.length;i++) {
            for (let c=0;c<chars.length;c++) {
                if (matches(subresult[i],chars[c])) { 
                    result.push(subresult[i]+chars[c]);
                }
            }
        }
        return chars.concat(result);
    }
}

const starters:string[] = tunels.filter((t:string[]) => (t[0] === 'start')).map(p => p.join('-'));

console.log("starters:",starters);

const enders:string[] = tunels.filter((t:string[]) => (t[1] === 'end')).map(p => p.join('-'));

console.log("enders:",enders);

let preMiddlers = tunels.filter((t:string[]) => (!(t.includes('start') || t.includes('end')))).map(p => p.join('-'));
let middlers:string[] = getCombinations2( //all possible path combinations
    preMiddlers,8
); 
console.log("middlers:",middlers);
console.log("preMiddlers:",preMiddlers);
middlers = middlers.concat(preMiddlers);
middlers.unshift('');
console.log("middlers mixed:",middlers);

function isValidPath(p:string):boolean {
    let validPath = true;
    let paths:string[] = p.split('-');
    paths.pop(); 
    paths.shift();
 
    //  remove nonconnecting paths like 'start-AA-bc-Ab-Ad-bA-end'
    paths.forEach(v => {
        if (v.slice(0, v.length/2) !== v.slice(v.length/2)) {
            validPath = false;
        }
    });

    // remove paths where lowercase points were visited more, like 'start-AA-bb-dd-bb-end'
    let points = new Set();
    paths.forEach(v =>{
        if ((points.has(v)) && (v === v.toLowerCase())) {
            validPath = false;
        }
        points.add(v);
    });

    return validPath;
}

let allPaths:string[] = [];

//let's take every possible starter / middler / ender combination
for (let s=0;s<starters.length;s++) {
    for (let m=0;m<middlers.length;m++) {
        if((middlers[m].length === 0) || (starters[s].split('-')[1] === middlers[m].split('-')[0])) {
            for (let e=0;e<enders.length;e++) {
                const path = starters[s]+middlers[m]+enders[e];
                if (!(allPaths.includes(path)) && (isValidPath(path))) { allPaths.push(path); }
            }
        }
    }
}


console.log("Correct paths",allPaths,allPaths.length); 
//console.log(getCombinations2(['A','B','C'],4));