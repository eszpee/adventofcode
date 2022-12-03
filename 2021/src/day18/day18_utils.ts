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
                let first = s.slice(0,pointer-1);
                let mid = '';
                let last = '';

                if (isNum(s.charAt(pointer+1))) { //double digit first number
                    var firstNum = parseInt(s.slice(pointer,pointer+2),10); 
                    pointer += 3;
                }
                else { // single digit first number
                    var firstNum = parseInt(s.slice(pointer,pointer+1),10); 
                    pointer += 2;
                }

                if (isNum(s.charAt(pointer+1))) { //double digit second number
                    var secondNum = parseInt(s.slice(pointer,pointer+2),10); 
                    pointer += 2;
                }
                else { // single digit second number
                    var secondNum = parseInt(s.slice(pointer,pointer+1),10); 
                    pointer += 1;
                }
                last = s.slice(pointer+1);

                for (let i=first.length;i>=0;i--) { //first number going left
                    if (isNum(first.charAt(i))) {
                        if (isNum(first.charAt(i-1))) { //double digit number damn it
                            first = first.slice(0,i-1) + (parseInt(first.charAt(i-1)+first.charAt(i),10) + firstNum) + first.slice(i+1);
                        }
                        else {
                            first = first.slice(0,i) + (parseInt(first.charAt(i),10) + firstNum) + first.slice(i+1);
                        }
                        break;
                    }
                }

                for (let j=0;j<last.length;j++) { //second number going right
                    if (isNum(last.charAt(j))) {
                        if (isNum(last.charAt(j+1))) { //double digit number damn it
                            let newNum = parseInt(last.charAt(j)+last.charAt(j+1),10)+secondNum;
                            last = last.slice(0,j) + newNum + last.slice(j+2);
                        }
                        else {
                            last = last.slice(0,j) + (parseInt(last.charAt(j),10) + secondNum) + last.slice(j+1);
                        }
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
    const afterExplode = doExplode(s);
    if (afterExplode === s) {
        const afterSplit = doSplit(afterExplode);
        if (afterSplit === afterExplode) {
            return afterSplit;
        }
        else {
            return doReduce(afterSplit);
        }
    }
    else {
        return doReduce(afterExplode);
    }
}

function doAdd(s1:string,s2:string):string {
    return doReduce('['+s1+','+s2+']');
}

export function addList(s:string[]):string {
    const sCopy = JSON.parse(JSON.stringify(s));
    while (sCopy.length > 1) {
        const first = sCopy.shift() || '';
        const second = sCopy.shift() || '';
        sCopy.unshift(doAdd(first,second));
    }
    return sCopy[0];
}

export function magnitude(s:string):string {
    let mag = 0;
    let processString = '';
    let openPosition = -1;
    for (let pointer = 0; pointer < s.length; pointer++) {
        let currentChar = s.charAt(pointer);
        if (currentChar === '[') {
            openPosition = pointer;
            processString = ''; 
        }
        else if (currentChar === ']') {
            //we need to take the rightmost pair in processString and apply multiply/replace
            const nums = processString.split(',').map(Number);
            const newNums = nums[0]*3 + nums[1]*2;
            s = s.slice(0,openPosition) + newNums + s.slice(openPosition+processString.length+2);
            return magnitude(s);
        }
        else { // we have numbers or commas
            if (openPosition > -1) {
                processString += currentChar;
            }
            else { //only numbers in s, we're done!
                return s;
            }
        }
    }
    return magnitude(s);
}

export function largestMagnitude(s:string[]):number {
    const magnitudes = [];
    for (let a=0;a<s.length;a++) {
        for (let b=0;b<s.length;b++) {
            if (a !== b) {
                magnitudes.push(parseInt(magnitude(addList([s[a],s[b]])),10));
            }
        }
    }
    magnitudes.sort((a,b) => b-a);
    return magnitudes[0];
}
