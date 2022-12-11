const input = readInput("./day11-sample.txt"); 
/* data structures:

*/ 

/* algo:
*/

input.forEach(line => {

});


console.log('First part:');
console.log('Second part:');

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}