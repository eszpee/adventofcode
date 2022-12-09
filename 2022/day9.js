const input = readInput("./day9-sample.txt"); /*

/* data structures:
rope[]{x: 1, y: 3}                          //we need array of knots - a full rope, where rope[0] is the head
visited: Set('1-3')                         //coordinates of visited places
*/ 

var rope = new Array()
for (var i=0;i<10;i++) {
  rope[i] = {x: 1000, y:1000};              //don't want to think about negatives
}

var visited = new Set();

input.forEach(line => {
    var [direction, steps] = line.split(' ');
    switch (direction) {
      case 'R':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].x++;  
          for (var k = 0; k<9; k++) {followHead(k);}
        }
        break;
      case 'L':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].x--;
          for (var k = 0; k<9; k++) {followHead(k);}
        }
        break;
      case 'U':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].y++;
          for (var k = 0; k<9; k++) {followHead(k);}
        }
        break;
      case 'D':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].y--;
          for (var k = 0; k<9; k++) {followHead(k);}
        }
        break;
      default:
        break;
    }
    //TODO: visualize rope here.
});

console.log("Result:",visited.size);

function followHead(h) {
  //h: index of head to follow
  //moves tail after head and records visited coordinates
  console.log('checking rope knot',h,'rope before move:', rope);
  if (touching(h)) { console.log('touching');}
  else {
    if (rope[h].x-1 > rope[h+1].x) {
      rope[h+1].x++;
      rope[h+1].y = rope[h].y;
    }
    if (rope[h].x+1 < rope[h+1].x) {
      rope[h+1].x--;
      rope[h+1].y = rope[h].y;
    }
    if (rope[h].y-1 > rope[h+1].y) {
      rope[h+1].y++;
      rope[h+1].x = rope[h].x;
    }
    if (rope[h].y+1 < rope[h+1].y) {
      rope[h+1].y--;
      rope[h+1].x = rope[h].x;
    }
  }
  visited.add(rope[9].x+'-'+rope[9].y);         
  console.log('after move: ',rope);
}
function touching(h){
  //h: head to check if touching
  //returns true of head and tail are touching or overlapping
  return ((Math.abs(rope[h].x-rope[h+1].x) < 2) && (Math.abs(rope[h].y-rope[h+1].y) < 2));
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