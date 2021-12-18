const explode = (s:string):string => {
    let openCounter = 0;
    let didWeExplodeAlready = false;
    for (let pointer = 0; pointer < s.length; pointer++) {
        let currentChar = s.charAt(pointer);
        if (currentChar === '[') {
            openCounter++;
        }
        else if (currentChar === ']') {
            openCounter--;
        }
        else if (parseInt(currentChar,10) != NaN) {
            if (openCounter >= 5) {
                

                didWeExplodeAlready = true;
                break;
            }
        }
    }
    return s;
}