const path = require('path');

const input = readInput("./day12.txt");
const Epos = {  x: 59, y : 21 };
//const Epos = { x: 5, y: 2 };
const distWeight = 10;

const includesArray = (data, arr) => {
  return data.some(e => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o)));
}
/* data structures:
  map[][] = 'a'       //map
  paths[] = {
    visited = []      //visited coordinates
    next : (1,2)      //coordinates of next valid step
    length : 1        //length of path so far
  }
  valid_paths[] = {
    length : 3232     //length of valid path
    path : [(1,2),(1,2)] //path
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
var sortest_found = Infinity;
var pathmap = Array(input[0].length).fill(null).map(()=>Array(input.length).fill(Infinity))


for (var i = 0; i<input.length;i++) {
  atlas.push(input[i].split(''));
  if (input[i].charAt(0) == 'S') {
    paths.push({x:0, y:i, length : 1, visited:[[i,0]]});
  }
}
//console.log(atlas);
const maxX = atlas[0].length-1;
const maxY = atlas.length-1;
var currstep;

while (currstep = paths.shift()) {
  if ((sortest_found <= currstep.length) || (pathmap[currstep.x][currstep.y] < currstep.length))
    { continue; }
  pathmap[currstep.x][currstep.y] = currstep.length;
  console.log(paths.length,sortest_found,'x:',currstep.x,'y:',currstep.y,'l:',currstep.length,'d:',distance([currstep.x,currstep.y],[Epos.x,Epos.y]));
  var found = false;
  //right
  if (currstep.x < maxX && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y][currstep.x+1]) &&
    newPath(currstep.visited,[currstep.y,currstep.x+1]) 
    ) {
//      console.log('right');
      if(atlas[currstep.y][currstep.x+1] == 'E') {
//        console.log('arrived!');
        if (sortest_found > currstep.length) {
          sortest_found = currstep.length;
        };

        valid_paths.push(
          {
            length: currstep.length,
            path: currstep.visited
          }
        );
      }
      else {
        after = {
          x : currstep.x+1, 
          y : currstep.y, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y,currstep.x+1]]
        };
//        console.log('pushing after:',after);
        paths.push(after);
      }
  }
  //left
  if (currstep.x > 0 && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y][currstep.x-1]) &&
    newPath(currstep.visited,[currstep.y,currstep.x-1]) 
    ) {
//      console.log('left');
      if(atlas[currstep.y][currstep.x-1] == 'E') {
//        console.log('arrived!');
        if (sortest_found > currstep.length) {
          sortest_found = currstep.length;
        };
        valid_paths.push(
          {
            length: currstep.length,
            path: currstep.visited
          }
        );
      }
      else {
        after = {
          x : currstep.x-1, 
          y : currstep.y, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y,currstep.x-1]]
        };
//        console.log('pushing after:',after);
        paths.push(after);
      }
  }
  //down
  if (currstep.y < maxY && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y+1][currstep.x]) &&
    newPath(currstep.visited,[currstep.y+1,currstep.x]) 
    ) {
//      console.log('down');
      if(atlas[currstep.y+1][currstep.x] == 'E') {
//        console.log('arrived!');
          if (sortest_found > currstep.length) {
            sortest_found = currstep.length;
          };
          valid_paths.push(
          {
            length: currstep.length,
            path: currstep.visited
          }
        );
      }
      else {
        after = {
          x : currstep.x, 
          y : currstep.y+1, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y+1,currstep.x]]
        };
//        console.log('pushing after:',after);
        paths.push(after);
      }
  }
  //up
  if (currstep.y > 0 && 
    stepOK(atlas[currstep.y][currstep.x],atlas[currstep.y-1][currstep.x]) &&
    newPath(currstep.visited,[currstep.y-1,currstep.x]) 
    ) {
//      console.log('up');
      if(atlas[currstep.y-1][currstep.x] == 'E') {
//        console.log('arrived!');
        if (sortest_found > currstep.length) {
          sortest_found = currstep.length;
        };
        valid_paths.push(
          {
            length: currstep.length,
            path: currstep.visited
          }
        );
      }
      else {
        after = {
          x : currstep.x, 
          y : currstep.y-1, 
          length : currstep.length+1, 
          visited:[...currstep.visited,[currstep.y-1,currstep.x]]
        };
//        console.log('pushing after:',after);
        paths.push(after);
      }
  }  
  // sort paths array to have the shortest + closest to end at the beginning
//  console.log('BEFORE SORTING',paths);
  //paths.filter(item => item.length >= sortest_found);
  paths.sort((a,b) => a.length+distWeight*distance([a.x,a.y],[Epos.x,Epos.y]) - b.length+distWeight*distance([b.x,b.y],[Epos.x,Epos.y]));
//  console.log('AFTER SORTING',paths);
}

console.log(valid_paths.sort((a,b) => a.length-b.length)[0]);

console.log('First part:',valid_paths.sort((a,b) => a.length-b.length)[0].length);
console.log('Second part:',);

function distance([a,b],[x,y]) {
  return Math.sqrt((Math.abs(a-x)*Math.abs(a-x))+(Math.abs(b-y)*Math.abs(b-y)));
}

function stepOK(a,b) {
  //takes two chars
  //returns if step is valid from a to b
  if (b == 'E') {b = 'z'}; 
  if (a == 'S') { return true; }
  if (b.charCodeAt(0) -1 <= a.charCodeAt(0)) { return true; }
  return false;
}

function newPath(steps,nextstep) {
  //takes steps array for previous steps, checks if nextstep was already in it
  //console.log('checking if ',nextstep,'is in',steps);
  if (includesArray(steps,nextstep)) {
//    console.log(nextstep,'already visited');
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

