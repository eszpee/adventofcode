"use strict";
var _a;
exports.__esModule = true;
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
var inputfile_1 = require("./inputfile");
var inputArray = (0, inputfile_1.readInputArray)('../input/day04.txt');
var boards = new Array();
var numbers = ((_a = inputArray.shift()) !== null && _a !== void 0 ? _a : '').split(',').map(function (v) { return parseInt(v, 10); });
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
var weHaveAWinner = false;
for (var numIndex = 0; !weHaveAWinner && numIndex < numbers.length; numIndex++) {
    //reading out numbers
    var currentNumber = numbers[numIndex];
    for (var b = 0; b < boards.length; b++) {
        boards[b].crossOut(currentNumber);
        if (boards[b].didWeWin()) {
            weHaveAWinner = true;
            console.log(currentNumber * boards[b].remainingSum());
            break;
        }
    }
}