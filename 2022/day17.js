const input = readInput("./day17-sample.txt");
/* data structures:

*/ 
/* algo:

*/

for (var i = 0; i<input.length;i++) {
  line = input[i];

}

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

