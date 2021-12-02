'use strict';
class Submarine {
    horizontal: number;
    depth: number;
    aim: number;
   
    constructor(horizontal: number, depth: number, aim: number) {
      this.horizontal = horizontal;
      this.depth = depth;
      this.aim = aim;
    }

    forward(steps: number): void {
        this.horizontal += steps;
        this.depth += this.aim * steps;
    }

    up(steps: number): void {
        this.aim -= steps;
    }

    down(steps: number): void {
        this.aim += steps;
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

let subM = new Submarine(0,0,0);
require('fs').readFileSync('/Users/eszpee/projects/adventofcode2021/02/input.txt', 'utf-8').split(/\r?\n/).forEach(moveSub);
console.log(subM.position());