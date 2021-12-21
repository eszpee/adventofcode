export function throwPracticeDie(prev:number):number {
    return (prev+1)%100;
}

export function advance(prev:number, steps:number):number {
    const newPos = (prev+steps)%10;
    if (newPos === 0 ) {
        return 10;
    }
    else {
        return newPos;
    }
}