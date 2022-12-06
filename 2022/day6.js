const inputArray = //readInput("./day4.txt"); /*
 [
'bvwbjplbgvbhsrlpgdmjqwftvncz',
]; //*/




function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}