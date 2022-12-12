const includesArray = (data, arr) => {
  return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
}
const input = readInput("./day12-sample.txt");
/* data structures:
  map[][] = 'a'       //map
  paths[] = {
    visited = []      //visited coordinates
    next : (1,2)      //coordinates of next valid step
    length : 1        //length of path so far
  }
  valid_paths[] = {
    length = 3232     //length of valid path
  }
*/ 
/* algo:
  load up atlas[][]
  add start point to paths[]
  while (paths not empty) {
    path = paths.shift
    examine all coordinates and 
      add to paths if valid
      add to valid_paths if arrived at end
  }

  print shortest path
*/

var atlas = new Array();
var paths = new Array();
var valid_paths = new Array();

for (var i = 0; i<input.length;i++) {
  atlas.push(input[i].split(''));
  if (input[i].charAt(0) == 'S') {
    paths.push({x:0, y:i, length : 1, visited:[[i,0]]});
  }
}
//console.log(atlas);
const maxX = input[0].length-1;
const maxY = input.length-1;
var currstep;

while (currstep = paths.shift()) {
  console.log('current step',currstep);
  var found = false;
  //right
  if (currstep.x < maxX && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y][currstep.x+1]) &&
    newPath(currstep.visited,[currstep.y,currstep.x+1]) 
    ) {
      if(atlas[currstep.y][currstep.x+1] == 'E') {
        valid_paths.push(currstep.length+1);
      }
      else {
        after = {
          x : currstep.x+1, 
          y : currstep.y, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y,currstep.x+1]]
        };
        console.log('pushing after:',after);
        paths.push(after);
      }
  }
  //left
  if (currstep.x > 0 && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y][currstep.x-1]) &&
    newPath(currstep.visited,[currstep.y,currstep.x-1]) 
    ) {
      if(atlas[currstep.y][currstep.x-1] == 'E') {
        valid_paths.push(currstep.length+1);
      }
      else {
        after = {
          x : currstep.x-1, 
          y : currstep.y, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y,currstep.x-1]]
        };
        console.log('pushing after:',after);
        paths.push(after);
      }
  }
  //down
  if (currstep.y < maxY && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y+1][currstep.x]) &&
    newPath(currstep.visited,[currstep.y+1,currstep.x]) 
    ) {
      if(atlas[currstep.y+1][currstep.x] == 'E') {
        valid_paths.push(currstep.length+1);
      }
      else {
        after = {
          x : currstep.x, 
          y : currstep.y+1, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y+1,currstep.x]]
        };
        console.log('pushing after:',after);
        paths.push(after);
      }
  }
  //up
  if (currstep.y > 0 && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y-1][currstep.x]) &&
    newPath(currstep.visited,[currstep.y-1,currstep.x]) 
    ) {
      if(atlas[currstep.y-1][currstep.x] == 'E') {
        valid_paths.push(currstep.length+1);
      }
      else {
        after = {
          x : currstep.x, 
          y : currstep.y-1, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y-1,currstep.x]]
        };
        console.log('pushing after:',after);
        paths.push(after);
      }
  }  
}

console.log(valid_paths);

console.log('First part:',);
console.log('Second part:',);

function stepOK(a,b) {
  //takes two chars
  //returns if step is valid from a to b 
  if (a == 'S') { return true; }
  if (b.charCodeAt(0) -1 <= a.charCodeAt(0)) { return true; }
  return false;
}

function newPath(steps,nextstep) {
  //takes steps array for previous steps, checks if nextstep was already in it
  console.log('checking if ',nextstep,'is in',steps);
  if (includesArray(steps,nextstep)) {
    console.log('already visited');
    return false;
  }
  return true;
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

