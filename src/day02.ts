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

    moveSub(line: string): void {
        let [command, value]: string[] = line.split(' '); 
        switch(command) {
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
    }
}

let subM = new Submarine(0,0,0);
require('fs').readFileSync('../input/day02.txt', 'utf-8').split(/\r?\n/).forEach((line: string) => subM.moveSub(line));
console.log(subM.position());