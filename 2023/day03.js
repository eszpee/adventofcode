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

for (var i = 0; i<input.length;i++) {
  line = input[i];
  schematic.push(line.split(''));
}

console.log(schematic);

console.log('First part:',);
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

