'use strict';
var Submarine = /** @class */ (function () {
    function Submarine(horizontal, depth, aim) {
        this.horizontal = horizontal;
        this.depth = depth;
        this.aim = aim;
    }
    Submarine.prototype.forward = function (steps) {
        this.horizontal += steps;
        this.depth += this.aim * steps;
    };
    Submarine.prototype.up = function (steps) {
        this.aim -= steps;
    };
    Submarine.prototype.down = function (steps) {
        this.aim += steps;
    };
    Submarine.prototype.position = function () {
        return this.horizontal * this.depth;
    };
    Submarine.prototype.moveSub = function (line) {
        var _a = line.split(' '), command = _a[0], value = _a[1];
        switch (command) {
            case 'forward': {
                this.forward(parseInt(value));
                break;
            }
            case 'up': {
                this.up(parseInt(value));
                break;
            }
            case 'down': {
                this.down(parseInt(value));
                break;
            }
        }
    };
    return Submarine;
}());
var subM = new Submarine(0, 0, 0);
require('fs').readFileSync('../input/day02.txt', 'utf-8').split(/\r?\n/).forEach(function (line) { return subM.moveSub(line); });
console.log(subM.position());
