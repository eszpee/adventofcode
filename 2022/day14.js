const input = readInput("./day14.txt");
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

//create wall (x size: maxx-minx+2, y size: maxy+3)
const wallX = maxX-minX+2+1, wallY = maxY+1;
const value = '.';
var cave = Array.from(Array(wallY), () => Array(wallX).fill(value));

//draw rock walls
for (var line = 0; line<input.length;line++) {
  var coords = input[line].split(' -> ');
  for (var coord = 1;coord<coords.length;coord++) {
    //draw wall from coords[i-1] -> coords [i]
    var start = [Number(coords[coord-1].split(',')[1]),Number(coords[coord-1].split(',')[0])-minX+1];
    var end = [Number(coords[coord].split(',')[1]),Number(coords[coord].split(',')[0])-minX+1];
    if (start[0] > end[0]) {
      for (var i = 0;i <= start[0]-end[0];i++) {
        cave[end[0]+i][start[1]]='#';
      }
    }
    if (start[0] < end[0]) {
      for (var i = 0;i <= end[0]-start[0];i++) {
        cave[start[0]+i][start[1]]='#';
      }
    }
    if (start[1] > end[1]) {
      for (var i = 0;i <= start[1]-end[1];i++) {
        cave[start[0]][end[1]+i]='#';
      }
    }
    if (start[1] < end[1]) {
      for (var i = 0;i <= end[1]-start[1];i++) {
        cave[start[0]][start[1]+i]='#';
      }
    }
  }
}

var sandfalling = true; //there is at least one sand falling
var howManySand = 0;

while (sandfalling) {
  var sandX = 500-minX+1;
  var sandY = 0;
  var thisSandFalls = true;
  while(thisSandFalls) {
    cave[sandY][sandX] = '+';
    drawCave(cave);
    sandY++
    if (sandY == maxY+1) {
      thisSandFalls = false;
      sandfalling = false;
    }
    else if (cave[sandY][sandX] == '.') {
      cave[sandY-1][sandX] = '.';
    }
    else if(cave[sandY][sandX-1] == '.') {
      cave[sandY-1][sandX] = '.';
      sandX--;
    }
    else if(cave[sandY][sandX+1] == '.') {
      cave[sandY-1][sandX] = '.';
      sandX++;
    }
    else {
      cave[sandY-1][sandX] = 'o';
      howManySand++;
      thisSandFalls = false;
    }    
  }
  drawCave(cave);
}




console.log('First part:',howManySand);
console.log('Second part:',);

function drawCave (cave) {
  return;
  console.log(cave.map(line => line.join('')).join('\n'));
}

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}

