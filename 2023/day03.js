const { on } = require('events');

const input = readInput("./day03-sample.txt");
/* data structures:
const schematic = [
  // array of arrays of characters
  ['1', '2', '.', '.', ...],
  ['.', '.', '3', '$', ...],
  ...
];
*/ 
/* algo:

Iterate over schematic
  When found a number, keep adding to a temporary store
    current number of value
    start coordinate
    end coordinate
  When found not number or end of line, check validity of number
    four checks:
      star coordinate -1 should be dot
      end coordinate +1 should be dot
      start coordinate -1 and row above should be dot for all coordinates -1 / +1
      start coordinate +1 and row below should be dot for all coordinates -1 / +1
    if all true, add to sum
*/

let schematic = [];
for (var i = 0; i < input.length; i++) {
  line = input[i];
  schematic.push(line.split(''));
}

let sumOfNumbers = 0;

for (let row = 0; row < schematic.length; row++) {
  const line = schematic[row];
  let currentNumber = '';
  let ongoingNumber = false;
  for (let col = 0; col < line.length; col++) {
    const item = line[col];
    if (!isNaN(parseInt(item)) && item.length === 1) {
      //we found a number
      ongoingNumber = true;
      currentNumber += item;
      continue;
    }
    else if (ongoingNumber) {
      //we just finished a number, check validity
      console.log('found number', currentNumber, 'at', row, col);
      if (isValidNumber(currentNumber, row, col)) {
        sumOfNumbers += parseInt(currentNumber, 10);
      }
      currentNumber = '';
      ongoingNumber = false;
    }
  }
  //end of line, need to check if we have a number
  if (ongoingNumber) {
    //we just finished a number, check validity
    console.log('found number', currentNumber, 'at', row, col);
    if (isValidNumber(currentNumber, row, col)) {
      sumOfNumbers += parseInt(currentNumber, 10);
    }
    currentNumber = '';
    ongoingNumber = false;
  }
}
//console.log(schematic);



console.log('First part:',sumOfNumbers);
console.log('Second part:',);

function isValidNumber(number, row, col) {

  return true;
}



function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}

