const input = readInput("./day10-sample.txt"); 
/* data structures:
*/ 


input.forEach(line => {
});



function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}