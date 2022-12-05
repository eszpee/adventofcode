const inputArray = //readInput("./day4.txt"); /*
 [
'    [D]    ',
'[N] [C]    ',
'[Z] [M] [P]',
 '1   2   3 ',
'',
'move 1 from 2 to 1',
'move 3 from 1 to 3',
'move 2 from 2 to 1',
'move 1 from 1 to 2',
]; //*/

console.log(inputArray);

//console.log("First part: ",sum);




function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}