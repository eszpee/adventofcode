import { start } from 'repl';
import { inspect } from 'util';
import { readInputArray } from "./inputfile";
let inputArray:string[] = readInputArray('../input/day13.txt'); /*
[
    '6,10',
    '0,14',
    '9,10',
    '0,3',
    '10,4',
    '4,11',
    '6,0',
    '6,12',
    '4,1',
    '0,13',
    '10,12',
    '3,4',
    '3,0',
    '8,4',
    '1,10',
    '2,14',
    '8,10',
    '9,0',
    '',
    'fold along y=7',
    'fold along x=5'
]; 
*/
// readInputArray('../input/day13.txt');

function drawMap(map:boolean[][]):void {
    let str='';
    for (let i=0;i<map.length;i++) {
        for (let j=0;j<map[0].length;j++) {
            str += map[i][j] ? '#' : '.';
        }
        str += '\n';
    }
    console.log(str);
}

function fold(map:boolean[][],direction:string,where:number):boolean[][] {
    console.log(`folding ${direction} in line/row ${where}`);
    if (direction === 'y') {
        let returnMap:boolean[][] = new Array((map.length-1)/2).fill(undefined).map(()=>Array(map[0].length).fill(false));
        for (let y=0;y<returnMap.length;y++) {
            for (let x=0;x<returnMap[0].length;x++) {
                returnMap[y][x] = map[y][x];
                if (map[map.length-1-y][x]) {
                    returnMap[y][x] = true;
                }
            }
        }
        return returnMap;
    }
    else {
        //return map;
        let returnMap:boolean[][] = new Array(map.length).fill(undefined).map(()=>Array((map[0].length-1)/2).fill(false));
        for (let y=0;y<returnMap.length;y++) {
            for (let x=0;x<returnMap[0].length;x++) {
                returnMap[y][x] = map[y][x];
                if (map[y][map[0].length-1-x]) {
                    returnMap[y][x] = true;
                }
            }
        }
        return returnMap;
    }
}

function countDots(map:boolean[][]):number {
    return map.flat(2).filter(v => v).length;
}

const inputs = inputArray.join('\n').split('\n\n');
const points:number[][] = inputs[0].split('\n').map(item => item.split(',').map(Number)); 
const folds:string[][] = inputs[1].split('\n').map(item => item.split(' ')[2].split('='));
console.log(points,folds);

let maxes:number[] = [0,0];
points.forEach(coord => { 
    [0,1].forEach(i => { 
        if (maxes[i] < coord[i]) maxes[i] = coord[i];
    })
});
console.log(maxes);
let map:boolean[][] = new Array(maxes[1]+1).fill(undefined).map(()=>Array(maxes[0]+1).fill(false));
points.forEach(coord => {
    //coord[0],coord[1]
    console.log(coord);
    map[coord[1]][coord[0]] = true;
});
folds.forEach((f,index) => {
    if (index == 0) {
        map = fold(map,f[0],parseInt(f[1],10))
        drawMap(map);
    };
});
console.log(countDots(map));
