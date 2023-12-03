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
      if (!isNonadjacentNumber(currentNumber, row, col)) {
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
    if (!isNonadjacentNumber(currentNumber, row, col)) {
      sumOfNumbers += parseInt(currentNumber, 10);
    }
    currentNumber = '';
    ongoingNumber = false;
  }
}
//console.log(schematic);



console.log('First part:',sumOfNumbers);
console.log('Second part:',);

function isNonadjacentNumber(number, row, endCol) {
  endCol = endCol - 1;
  const startCol = endCol - number.length + 1;
  console.log('checking validity of number', number, 'at', row, startCol);

  // check character before
  if ((startCol > 0) && (schematic[row][startCol-1] !== '.')) {
    console.log('\tcharacter before is not dot')
    return false;
  }

  // check character after
  if ((startCol+endCol < schematic[row].length) && (schematic[row][endCol+1] !== '.')) {
    console.log('\tcharacter after is not dot')
    return false;
  }

  // if row is larger than 0, check if previous row is valid
  if (row > 0) {
    const previousRow = schematic[row-1];
    for (let col = startCol-1; col <= endCol+1; col++) {
      if ((col > 0) && (col < previousRow.length) && previousRow[col] !== '.') {
        console.log('\tcharacter somewhere above is not dot')
        return false;
      }
    }
  }

  // if row is smaller than schematic.length, check if next row is valid
  if (row < schematic.length) {
    const nextRow = schematic[row+1];
    for (let col = startCol-1; col <= endCol+1; col++) {
      if ((col > 0) && (col < nextRow.length) && nextRow[col] !== '.') {
        console.log('\tcharacter somewhere below is not dot')
        return false;
      }
    }
  }



  console.log('number is valid');
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

