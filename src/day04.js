"use strict";
exports.__esModule = true;
var inputfile_1 = require("./inputfile");
var BingoBoard = /** @class */ (function () {
    function BingoBoard(board) {
        this.size = board[0].length;
        this.board = board;
        this.checked = new Array(this.size);
        for (var i = 0; i < this.size; i++) {
            this.checked[i] = new Array(this.size).fill(false);
        }
    }
    BingoBoard.prototype.crossOut = function (num) {
        var found = false;
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (this.board[i][j] === num) {
                    this.checked[i][j] = true;
                    found = true;
                }
            }
        }
        return found;
    };
    BingoBoard.prototype.didWeWin = function () {
        for (var i = 0; i < this.size; i++) {
            // check horizontal
            var rowFull = true;
            var j = 0;
            while ((rowFull) && (j < this.size)) {
                if (!this.checked[i][j]) {
                    rowFull = false;
                }
                j++;
            }
            if (rowFull) {
                return true;
            }
            // check vertical
            var colFull = true;
            j = 0;
            while ((colFull) && (j < this.size)) {
                if (!this.checked[j][i]) {
                    colFull = false;
                }
                j++;
            }
            if (colFull) {
                return true;
            }
        }
        return false;
    };
    BingoBoard.prototype.remainingSum = function () {
        var sum = 0;
        for (var i = 0; i < this.size; i++) {
            for (var j = 0; j < this.size; j++) {
                if (!this.checked[i][j]) {
                    sum += this.board[i][j];
                }
            }
        }
        return sum;
    };
    return BingoBoard;
}());
/*
const testField = [[1,2,3],[4,5,6],[7,8,9]];
let testBoard = new BingoBoard(testField);
testBoard.crossOut(5);
testBoard.crossOut(2);
testBoard.crossOut(8);
console.log(testBoard,testBoard.didWeWin(),testBoard.remainingSum());
 */
var inputArray = (0, inputfile_1.readInputArray)('../input/day04_sample.txt');
var boards = new Array();
var numbers = inputArray.shift().split(',').map(function (v) { return parseInt(v, 10); });
var line = '';
var tempArray = new Array();
while ((line = inputArray.shift()) !== undefined) {
    if (line === '') {
        if (tempArray.length > 0) {
            boards.push(new BingoBoard(tempArray));
        }
        tempArray = new Array();
    }
    else {
        if (line.charAt(0) === ' ') {
            line = line.substr(1);
        }
        tempArray.push(line.split(/  ?/).map(function (v) { return parseInt(v, 10); }));
    }
}
boards.push(new BingoBoard(tempArray));
/* for (let i=0;i<boards.length;i++) {
    realBoards.push(new BingoBoard(boards[i]));
}
 */
console.log(boards);
console.log(boards[0]);
