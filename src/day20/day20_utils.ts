export function deepCopy(a:any):any {
    return JSON.parse(JSON.stringify(a));
}

export function bin2dec(bin:string):number {
    const num:number = parseInt(bin,2);
    return num;
}

export function dot2bin(s:string):string {
    return s.replace(/\./g,'0').replace(/#/g,'1');
}

export function cropImage(image:string[],border:string='0'): string[] {
    let nonBorder = '1';
    if (border != '0') {
        nonBorder = '0';
    }
    let croppedImage:string[] = deepCopy(image);

    //top
    let line = croppedImage.shift() || '';
    while (line?.match(nonBorder)?.length == undefined) {
        line = croppedImage.shift() || '';
    }
    croppedImage.unshift(line);

    //bottom
    line = croppedImage.pop() || '';
    while (line?.match(nonBorder)?.length == undefined) {
        line = croppedImage.pop() || '';
    }
    croppedImage.push(line);

    //left 
    let firstNonZero = -1;
    for (let i=0;i<croppedImage[0].length;i++) {
        for (let j=0;j<croppedImage.length;j++) {
            if (croppedImage[j].charAt(i) == nonBorder) {
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
            if (croppedImage[j].charAt(i) == nonBorder) {
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

    //add 3-pixel border
    for (let i=0;i<croppedImage.length;i++) {
        croppedImage[i] = border.repeat(3)+croppedImage[i]+border.repeat(3);
    }
    const zeroes:string = border.repeat(croppedImage[0].length);
    croppedImage.push(zeroes);
    croppedImage.push(zeroes);
    croppedImage.push(zeroes);
    croppedImage.unshift(zeroes);
    croppedImage.unshift(zeroes);
    croppedImage.unshift(zeroes);
    return croppedImage;
}

export function enhance(image:string[],algo:string,border:string):string[] {
    //takes an image to enhance with algo, repeating border around the result
    //returns enhanced and cropped image
    let newBorder = ''+(1-parseInt(border,10));
    if (algo[0] == '0') { //we won't be alternating pixels in infinity after every iteration
        newBorder = '0';
    }
    image = cropImage(image,border);
    let newImage:string[] = [];
    
    function getPixel(image:string[],x:number,y:number):string {
        return  image[x-1].charAt(y-1) +
                image[x-1].charAt(y) +
                image[x-1].charAt(y+1) +

                image[x]  .charAt(y-1) +
                image[x]  .charAt(y) +
                image[x]  .charAt(y+1) +

                image[x+1].charAt(y-1) +
                image[x+1].charAt(y) +
                image[x+1].charAt(y+1);
    }

    newImage.push(newBorder.repeat(image[0].length+2));
    for (let x=1;x<image.length-1;x++) { //no need to iterate on the edge of border
        let oneLine = newBorder;
        for (let y=1;y<image[0].length-1;y++) {
            const newChar = algo[bin2dec(getPixel(image,x,y))];
            oneLine += newChar;
        }
        oneLine += newBorder;
        newImage[x] = oneLine;
    }
    newImage.unshift(newBorder.repeat(image[0].length+2));
    return cropImage(newImage,newBorder);

}

export function litPixels(image:string[]):number {
    return image.join('').split('').filter(c => c=='1').length;
}