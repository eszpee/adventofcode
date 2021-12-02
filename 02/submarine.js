'use strict';
var Submarine = /** @class */ (function () {
    function Submarine(horizontal, depth) {
        this.horizontal = horizontal;
        this.depth = depth;
    }
    Submarine.prototype.forward = function (steps) {
        this.horizontal += steps;
    };
    Submarine.prototype.up = function (steps) {
        this.depth -= steps;
    };
    Submarine.prototype.down = function (steps) {
        this.depth += steps;
    };
    Submarine.prototype.position = function () {
        return this.horizontal * this.depth;
    };
    return Submarine;
}());
var subM = new Submarine(0, 0);
console.log(subM);
subM.forward(5);
subM.down(5);
subM.up(10);
console.log(subM);
console.log(subM.position());
