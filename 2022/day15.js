const input = readInput("./day15-sample.txt");
/* data structures:

*/ 
/* algo:

*/

sensors = new Array();
for (var i = 0; i<input.length;i++) {
  sensors.push(input[i].split(':').map(x => x.match(/([\-\d]+)/g)));
}



console.log('First part:',sensors);
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

