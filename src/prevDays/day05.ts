import { SeaMap } from "./day05_class";
import { readInputArray } from "../inputfile";
const inputArray:string[] = readInputArray('../input/day05.txt');

//determine map size. TODO: refactor SeaMap to have flexible map sizes...
const maxCoord:number | undefined = inputArray
    .map(line => line.split(' -> ')
        .map(coords => coords.split(','))
            .map(coord => coord.map(numS => parseInt(numS, 10))
        )
    )
    .flat(2)
    .sort((a, b) => a - b)
    .pop()
;

let myMap= new SeaMap(maxCoord);

inputArray
    .map(line => line.split(' -> ')
        .map(coords => coords.split(','))
            .map(coord => coord.map(numS => parseInt(numS, 10)))
    )
    .forEach(command => myMap.drawLine(command[0],command[1]))
;

myMap.printMap();
console.log(myMap.getCrosses());
