export function isNum(s:string):boolean {
    return /^\d+$/.test(s);
}

export function doExplode(s:string):string {
    let openCounter = 0;
    for (let pointer = 0; pointer < s.length; pointer++) {
        let currentChar = s.charAt(pointer);
        if (currentChar === '[') {
            openCounter++;
        }
        else if (currentChar === ']') {
            openCounter--;
        }
        else if (isNum(currentChar)) { // we have a number
            if (openCounter >= 5) { // and it should be exploded
                const mid = s.slice (pointer,pointer+3); // n,m
                let first = s.slice(0,pointer-1);
                let last = s.slice(pointer+4);
                const midArr = mid.split(',').map(Number);
                for (let i=first.length;i>=0;i--) {
                    if (isNum(first.charAt(i))) {
                        first = first.slice(0,i) + (parseInt(first.charAt(i),10) + midArr[0]) + first.slice(i+1);
                        break;
                    }
                }

                for (let j=0;j<last.length;j++) {
                    console.log(last.charAt(j));
                    if (isNum(last.charAt(j))) {
                        last = last.slice(0,j) + (parseInt(last.charAt(j),10) + midArr[1]) + last.slice(j+1);
                        break;
                    }
                }

                s = first + 0 + last;
                break;
            }
        }
    }
    
    return s;
}


export function doSplit(s:string) {
    for (let pointer = 0; pointer < s.length; pointer++) {
        let currentChar = s.charAt(pointer);
        if (isNum(currentChar)) { // we have a number
            if (isNum(s.charAt(pointer+1))) { //we have a number >10, we need to split it
                let first = s.slice(0,pointer);
                let last = s.slice(pointer+2);
                let num = parseInt(s.slice(pointer,pointer+2));

                s = first+'['+Math.floor(num/2)+','+Math.ceil(num/2)+']'+last;
            }
        }
    }
    return s;
}