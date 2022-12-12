const input = readInput("./day-sample.txt");
/* data structures:
  map[][] = 'a'       //map
  paths[] = {
    next = (1,2)      //coordinates of next valid step
    length = 1        //length of path so far
  }
  valid_paths[] = {
    length = 3232     //length of valid path
  }
*/ 
/* algo:
  load up map[][]
  add start point to paths[]
  while (paths not empty) {
    path = paths.unshift
    examine all coordinates and 
      add to paths if valid
      add to valid_paths if arrived at end
  }

  print shortest path
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

