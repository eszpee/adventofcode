const input = readInput("./day9-sample.txt"); /*

/* data structures:
head{x: 1, y: 2}
tail{x: 1, y: 3}
visited: Set('1-3')                         //coordinates of visited places
*/ 

var head = {x: 1000, y:1000};               //don't want to think about negatives
var tail = {x: 1000, y:1000};
var visited = new Set();

input.forEach(line => {
    var [direction, steps] = line.split(' ');
    switch (direction) {
      case 'R':
        for (var i=1;i<=Number(steps);i++) {
          head.x++;
          followHead();    
        }
        break;
      case 'L':
        for (var i=1;i<=Number(steps);i++) {
          head.x--;
          followHead();    
        }
        break;
      case 'U':
        for (var i=1;i<=Number(steps);i++) {
          head.y++;
          followHead();    
        }
        break;
      case 'D':
        for (var i=1;i<=Number(steps);i++) {
          head.y--;
          followHead();    
        }
        break;
      default:
        break;
    }
});

console.log("First part:",visited.size);
console.log("Second part:",);

function followHead() {
  //no input, uses global head and tail objects. 
  //moves tail after head and records visited coordinates
  console.log('before move: head:',head,'tail:',tail);
  if (touching()) { console.log('touching');}
  else {
    if (head.x-1 > tail.x) {
      tail.x++;
      tail.y = head.y;
    }
    if (head.x+1 < tail.x) {
      tail.x--;
      tail.y = head.y;
    }
    if (head.y-1 > tail.y) {
      tail.y++;
      tail.x = head.x;
    }
    if (head.y+1 < tail.y) {
      tail.y--;
      tail.x = head.x;
    }
  }
  visited.add(tail.x+'-'+tail.y);
  console.log('after move: head:',head,'tail:',tail);
}
function touching(){
  //no input, uses global head and tail objects. 
  //returns true of head and tail are touching or overlapping
  return ((Math.abs(head.x-tail.x) < 2) && (Math.abs(head.y-tail.y) < 2));
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