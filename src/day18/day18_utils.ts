export function isNum(s:string):boolean {
    return /^\d+$/.test(s);
}

export function doExplode(s:string):string {
    console.log('exploding',s);
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
                    //console.log(last.charAt(j));
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


export function doSplit(s:string):string {
    console.log('splitting',s);
    for (let pointer = 0; pointer < s.length; pointer++) {
        let currentChar = s.charAt(pointer);
        if (isNum(currentChar)) { // we have a number
            if (isNum(s.charAt(pointer+1))) { //we have a number >10, we need to split it
                let first = s.slice(0,pointer);
                let last = s.slice(pointer+2);
                let num = parseInt(s.slice(pointer,pointer+2));
                s = first+'['+Math.floor(num/2)+','+Math.ceil(num/2)+']'+last;
                break;
            }
        }
    }
    return s;
}

export function doReduce(s:string):string {
    console.log('reducing',s);
    const afterExplode = doExplode(s);
    console.log('explode result:',afterExplode)
    if (afterExplode === s) {
        console.log('after explode result is the same, we only need to split now');
        const afterSplit = doSplit(afterExplode);
        console.log('split result:',afterSplit)
        if (afterSplit === afterExplode) {
            console.log('after split result is also the same, we\'re done');
            return afterSplit;
        }
        else {
            console.log('after split result is different, we need to start again');
            return doReduce(afterSplit);
        }
    }
    else {
        console.log('after explode result is different, we need to start again');
        return doReduce(afterExplode);
    }
}

function doAdd(s1:string,s2:string):string {
    return doReduce('['+s1+','+s2+']');
}

export function addList(s:string[]):string {
    while (s.length > 1) {
        const first = s.shift() || '';
        const second = s.shift() || '';
        s.unshift(doAdd(first,second));
    }
    return s[0];
}