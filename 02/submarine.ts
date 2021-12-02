'use strict';
class Submarine {
    horizontal: number;
    depth: number;
   
    constructor(horizontal: number, depth: number) {
      this.horizontal = horizontal;
      this.depth = depth;
    }

    forward(steps: number): void {
        this.horizontal += steps;
    }

    up(steps: number): void {
        this.depth -= steps;
    }

    down(steps: number): void {
        this.depth += steps;
    }

    position(): number {
        return this.horizontal * this.depth;
    }
}

let subM = new Submarine(0,0);
console.log(subM);
subM.forward(5);
subM.down(5);
subM.up(10);
console.log(subM);
console.log(subM.position());