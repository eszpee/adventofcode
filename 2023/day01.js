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
console.log('Second part:',);

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}

