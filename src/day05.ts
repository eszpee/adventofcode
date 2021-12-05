class SeaMap {
    fields: number[][]; //2D map, 0-no current
//    maxes: number[];    //maxes[3]: how many points on map with 3 lines crossing  //we probably won't need this damn it
    size: number;       //let's consider the map square for now

    constructor(s:number|undefined) {
        this.size = s == undefined ? 0 : s+1;
//        this.maxes = new Array(255).fill(0);     //hope no more than 255 lines crossing at one point
        this.fields = new Array(this.size);
        for (let i=0;i<this.size;i++) {
            this.fields[i] = new Array(this.size).fill(0);
        }
    }

    printMap():void{
        let printString: string = '';
        for (let x=0;x<this.size;x++) {
            for (let y=0;y<this.size;y++) {
                printString += this.fields[x][y] === 0 ? '.' : this.fields[x][y];
            }
            printString+="\n";
        }
        console.log(printString);
    }

    drawLine(a:number[],b:number[]):void {
        if (a[0] === b[0]) {
            if (a[1]>b[1]) { //need to swap coordinates to draw left->right, up->down
                [a[1],b[1]] = [b[1],a[1]];
            }
            for (let i=a[1]; i<=b[1];i++) {
                this.fields[i][a[0]]++;
//                this.maxes[this.fields[a[0]][i]]++;
            }
        }
        else if (a[1] === b[1]) {
            if (a[0]>b[0]) { //need to swap coordinates to draw left->right, up->down
                [a[0],b[0]] = [b[0],a[0]];
            }
            for (let i=a[0]; i<=b[0];i++) {
                this.fields[a[1]][i]++;
//               this.maxes[this.fields[i][a[1]]]++;
            }
        }
        else {
            ;// Diagonal lines not implemented for now
        }
    }

/*     getMax():number { 
        for (let i=this.maxes.length;i>0;i--) {
            if (this.maxes[i] >0) {
                return i;
            }
        }
        return NaN;
    }
 */
    getCrosses():number {
        //find the number of points where more than one lines overlap
        let crosses = 0;
        for (let x=0;x<this.size;x++) {
            for (let y=0;y<this.size;y++) {
                if (this.fields[x][y] > 1) {
                    crosses++;
                }
            }
        }
        return crosses;
    }

}

import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day05_sample.txt');

//determine map size. TODO: refactor SeaMap to have flexible map sizes...
const maxCoord:number | undefined = inputArray.map(x =>
    x.split(' -> ').map(x =>
        x.split(',')).map(x => {
            return x.map(y => {
                return parseInt(y, 10)
            })
        })).flat(2).sort((a, b) => {
            return a - b;
        }).pop();

let myMap= new SeaMap(maxCoord);


inputArray.map(x =>
    x.split(' -> ').map(x =>
        x.split(',')).map(x => {
            return x.map(y => {
                return parseInt(y, 10)
            })
        }
    )
).forEach(command => {
    myMap.drawLine(command[0],command[1]);
});

myMap.printMap();
console.log(myMap.getCrosses());


/* let myMap= new SeaMap(10);
myMap.drawLine([0,0],[0,7]);
myMap.drawLine([0,5],[9,5]);
myMap.printMap();
console.log(myMap.getCrosses());
 */