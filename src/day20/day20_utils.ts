export function deepCopy(a:any):any {
    return JSON.parse(JSON.stringify(a));
}

export function cropImage(image:string[]): string[] {
    let croppedImage:string[] = deepCopy(image);

    //top
    let line = croppedImage.shift() || '';
    while (line?.match('1')?.length == undefined) {
        line = croppedImage.shift() || '';
    }
    croppedImage.unshift(line);

    //bottom
    line = croppedImage.pop() || '';
    while (line?.match('1')?.length == undefined) {
        line = croppedImage.pop() || '';
    }
    croppedImage.push(line);

    //left 
    let firstNonZero = -1;
    for (let i=0;i<croppedImage[0].length;i++) {
        for (let j=0;j<croppedImage.length;j++) {
            if (croppedImage[j].charAt(i) == '1') {
                firstNonZero = i;
                break;
            }
        }
        if (firstNonZero > -1) {
            break;
        }
    }
    if (firstNonZero > -1) {
        for (let i=0;i<croppedImage.length;i++) {
            croppedImage[i] = croppedImage[i].slice(firstNonZero);
        }
    }

    //right
    let lastNonZero = -1;
    for (let i=croppedImage[0].length-1;i>-1;i--) {
        for (let j=0;j<croppedImage.length;j++) {
            if (croppedImage[j].charAt(i) == '1') {
                lastNonZero = i;
                break;
            }
        }
        if (lastNonZero > -1) {
            break;
        }
    }
    if (lastNonZero > -1) {
        for (let i=0;i<croppedImage.length;i++) {
            croppedImage[i] = croppedImage[i].slice(0,lastNonZero+1);
        }
    }

    //add 2-pixel border
    for (let i=0;i<croppedImage.length;i++) {
        croppedImage[i] = '00'+croppedImage[i]+'00';
    }
    const zeroes:string = '0'.repeat(croppedImage[0].length);
    croppedImage.push(zeroes);
    croppedImage.push(zeroes);
    croppedImage.unshift(zeroes);
    croppedImage.unshift(zeroes);
    return croppedImage;
}