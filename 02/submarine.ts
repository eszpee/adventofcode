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

function moveSub(line: string): void {
    let [command, value]: string[] = line.split(' '); 
    switch(command) {
        case 'forward': {
            subM.forward(parseInt(value));
            break;
        }
        case 'up': {
            subM.up(parseInt(value));
            break;
        }
        case 'down': {
            subM.down(parseInt(value));
            break;
        }
    }
}

let subM = new Submarine(0,0);
require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/02/input.txt', 'utf-8').split(/\r?\n/).forEach(moveSub);
console.log(subM.position());