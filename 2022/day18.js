const input = readInput("./day18-sample.txt");
/* data structures:
  cubes[x,y,z];
*/ 
/* algo:
  Check all cubes for finding neighbors
  Neighbor definition: 2 coordinates are the same, the remaining only differs by one
  For every neighbor remove 2 from 6*cubes
*/

var cubes = new Array;
for (var i = 0; i<input.length;i++) {
  line = input[i];
  cubes.push(line.split(','));
}
var sides = cubes.length*6;

for (var c=0;c<cubes.length;c++) {
  //check x neighbor
  for (var cc=0;cc<cubes.length;cc++) {
    if (cc != c) {
      if ((cubes[c][1] == cubes[cc][1]) && (cubes[c][2] == cubes[cc][2]) && (Math.abs(cubes[c][0] - cubes[cc][0]) == 1) ) {
        sides -= 1;
      }
    }
  }

  //check y neighbor
  for (var cc=0;cc<cubes.length;cc++) {
    if (cc != c) {
      if ((cubes[c][0] == cubes[cc][0]) && (cubes[c][1] == cubes[cc][1]) && (Math.abs(cubes[c][2] - cubes[cc][2]) == 1) ) {
        sides -= 1;
      }
    }
  }

  //check z neighbor
  for (var cc=0;cc<cubes.length;cc++) {
    if (cc != c) {
      if ((cubes[c][2] == cubes[cc][2]) && (cubes[c][0] == cubes[cc][0]) && (Math.abs(cubes[c][1] - cubes[cc][1]) == 1) ) {
        sides -= 1;
      }
    }
  }
}

console.log('First part:',sides);
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

