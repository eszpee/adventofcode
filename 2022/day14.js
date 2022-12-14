const input = readInput("./day14-sample.txt");
/* data structures:
cave[y][x] = '#' - cave representation, from smallest minus one to largest plus one

*/ 
/* algo:
  fill up 'cave' with initial rock walls
  set sandfalling to true
  while sandfalling
    draw map for debugging
    drop + at 500
    loop until there are + on map
      move + down 
      if + is reaching smallest or largest set sanfalling to false and exit from loop
      if no move is possible, change + to o
  count o-s on map and write as first part    
*/

var minX=Infinity;
var minY=Infinity;
var maxX=0;
var maxY=0;
for (var i = 0; i<input.length;i++) {
  const coords = input[i].split(' -> ');
  coords.forEach(c => {
    var cc = c.split(',').map(x => Number(x));
    if (cc[0] < minX) { minX = cc[0]; }
    if (cc[0] > maxX) { maxX = cc[0]; }
    if (cc[1] < minY) { minY = cc[1]; }
    if (cc[1] > maxY) { maxY = cc[1]; }
  });
}
console.log(minX,minY,maxX,maxY);



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

