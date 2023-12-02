const input = readInput("./day01-sample.txt");
/* data structures:

*/ 
/* algo:

*/

let megaSum = 0;

for (var i = 0; i<input.length;i++) {
  line = input[i];
  //console.log('Current line:', line);
  const numbersOnly = line.replace(/\D/g, "");
//  console.log(numbersOnly); 
  const leftmostNumber = parseInt(numbersOnly.charAt(0));
  const rightmostNumber = parseInt(numbersOnly.charAt(numbersOnly.length - 1));
  megaSum += parseInt(leftmostNumber.toString() + rightmostNumber.toString());
}

console.log('First part:',megaSum);

megaSum = 0;

for (var i = 0; i<input.length;i++) {
  line = input[i];
  let currentString = '';
  const numbers = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
  };
  let newLine = '';
//  console.log('Current line:', line);
  for (let StartPointer = 0; StartPointer < line.length; StartPointer++) {
    for (let EndPointer = StartPointer + 1; EndPointer <= line.length; EndPointer++) {
      currentString = line.substring(StartPointer, EndPointer);
      if (currentString in numbers) {
        newLine += numbers[currentString];
        StartPointer = EndPointer;
      }
    }
    newLine += line.substring(StartPointer, StartPointer+1);
  }
//  console.log('Line after replacement:', newLine);
  line = newLine;
  const numbersOnly = line.replace(/\D/g, "");

// console.log(numbersOnly); 
  const leftmostNumber = parseInt(numbersOnly.charAt(0));
  const rightmostNumber = parseInt(numbersOnly.charAt(numbersOnly.length - 1));
  megaSum += parseInt(leftmostNumber.toString() + rightmostNumber.toString());
}




console.log('Second part:',megaSum);

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}

