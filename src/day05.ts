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

    drawLine(x1:number,y1:number,x2:number,y2:number):void {
        if (x1 === x2) {
            for (let i=y1; i<=y2;i++) {
                this.fields[x1][i]++;
                this.maxes[this.fields[x1][i]]++;
            }
        }
        else if (y1 === y2) {
            for (let i=x1; i<=x2;i++) {
                this.fields[i][y1]++;
                this.maxes[this.fields[i][y1]]++;
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

let myMap= new SeaMap(10);
myMap.drawLine(0,0,0,7);
myMap.drawLine(0,5,9,5);
myMap.printMap();
console.log(myMap.getCrosses());
//console.log(myMap);