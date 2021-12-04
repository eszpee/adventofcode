class BingoBoard {
    size: number;
    board: number[][];
    checked: boolean[][];

    constructor(board: number[][]) {
        this.size = board[0].length;
        this.board = board;
        this.checked = new Array(this.size);
        for (let i = 0; i<this.size; i++) {
            this.checked[i] = new Array(this.size).fill(false);
        }
    }

    crossOut(num: number):boolean {
        let found = false;
        for (let i:number=0;i<this.size;i++) {
            for (let j:number=0;j<this.size;j++) {
                if (this.board[i][j] === num) {
                    this.checked[i][j] = true;
                    found = true;
                }
            }
        }
        return found;
    }

    didWeWin():boolean {
        for (let i:number=0;i<this.size;i++) {
            // check horizontal
            let rowFull:boolean = true;
            let j:number = 0;
            while ((rowFull) && (j<this.size)) {
                if (!this.checked[i][j]) {
                    rowFull = false;
                }
                j++;
            }
            if(rowFull) {return true;}

            // check vertical
            let colFull:boolean = true;
            j=0;
            while ((colFull) && (j<this.size)) {
                if (!this.checked[j][i]) {
                    colFull = false;
                }
                j++;
            }
            if(colFull) {return true;}
        }
        return false;
    }

    remainingSum():number {
        let sum:number = 0;
        for (let i:number=0;i<this.size;i++) {
            for (let j:number=0;j<this.size;j++) {
                if (!this.checked[i][j]) {
                    sum += this.board[i][j];
                }
            }
        }
        return sum;
    }

}

const testField = [[1,2,3],[4,5,6],[7,8,9]];
let testBoard = new BingoBoard(testField);
testBoard.crossOut(5);
testBoard.crossOut(2);
testBoard.crossOut(8);
console.log(testBoard,testBoard.didWeWin(),testBoard.remainingSum());


