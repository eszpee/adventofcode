class SeaMap {
    fields: number[][]; //2D map, 0-no current
    maxes: number[];    //maxes[3]: how many points on map with 3 lines crossing  //we probably won't need this damn it
    size: number;       //let's consider the map square for now

    constructor(size:number) {
        this.size = size;
        this.maxes = new Array(255).fill(0);     //hope no more than 255 lines crossing at one point
        this.fields = new Array(size);
        for (let i=0;i<size;i++) {
            this.fields[i] = new Array(size).fill(0);
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
            for (let i=a[1]; i<=b[1];i++) {
                this.fields[a[0]][i]++;
                this.maxes[this.fields[a[0]][i]]++;
            }
        }
        else if (a[1] === b[1]) {
            for (let i=a[0]; i<=b[0];i++) {
                this.fields[i][a[1]]++;
                this.maxes[this.fields[i][a[1]]]++;
            }
        }
        else {
            throw('Diagonal lines not implemented!');
        }
    }

    getMax():number { 
        for (let i=this.maxes.length;i>0;i--) {
            if (this.maxes[i] >0) {
                return i;
            }
        }
        return NaN;
    }

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
/* 
import { readInputArray } from "./inputfile";
const inputArray:string[] = readInputArray('../input/day05_sample.txt');
let maxSize = 0;
let line:string|undefined = '';
while ((line = inputArray.shift()) !== undefined) {
    let coords = line.split(' -> ').map(x => x.split(','));
    console.log(coords);
}
 */
let myMap= new SeaMap(10);
myMap.drawLine([0,0],[0,7]);
myMap.drawLine([0,5],[9,5]);
myMap.printMap();
console.log(myMap.getCrosses());
