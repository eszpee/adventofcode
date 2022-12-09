const input = readInput("./day9.txt"); 
const maxknots = 9;
String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}
const {execSync} = require('child_process');
const v = false; //visualization on


/* data structures:
rope[]{x: 1, y: 3}                          //we need array of knots - a full rope, where rope[0] is the head
visited: Set('1-3')                         //coordinates of visited places
*/ 

var rope = new Array()
for (var i=0;i<10;i++) {
  rope[i] = {x: 0, y:0};              //don't want to think about negatives
}

var visited = new Set();

input.forEach(line => {
    var [direction, steps] = line.split(' ');
    switch (direction) {
      case 'R':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].x++;  
          for (var k = 0; k<maxknots; k++) {followHead(k,line+' '+k);}
        }
        break;
      case 'L':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].x--;
          for (var k = 0; k<maxknots; k++) {followHead(k,line+' '+k);}
        }
        break;
      case 'U':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].y++;
          for (var k = 0; k<maxknots; k++) {followHead(k,line+' '+k);}
        }
        break;
      case 'D':
        for (var i=1;i<=Number(steps);i++) {
          rope[0].y--;
          for (var k = 0; k<maxknots; k++) {followHead(k,line+' '+k);}
        }
        break;
      default:
        break;
    }
});

drawRope('Result: '+visited.size);

function drawRope(msg) {
  const squaresize = 30;
  const offset = Math.floor(squaresize/2);
  console.log('\033[2J');         //clear screen
  console.log(msg,'\n');
  if (v) {
    var out = new Array();
    for(var x=0;x<=squaresize;x++) {
      out[x] = '';
      for (var y=0;y<=squaresize;y++) {
        out[x] += '·';
      }
    }
    for (var i=maxknots;i>=0;i--) {
      //putting rope[i] to the map
      const row = squaresize-rope[i].y-offset;
      const col = rope[i].x+offset;
      out[row] = out[row].replaceAt(col,i.toString());
    }
    console.log(out.join('\n'));
    console.log('\n');
    execSync('sleep 0.001'); // block process for a second.
  }
}

function followHead(h,msg) {
  //h: index of head to follow
  //msg: message to pass to visualization
  //moves tail after head and records visited coordinates
  //console.log('checking rope knot',h,'rope before move:', rope);
  if (touching(h)) { 
    msg += ' touching';
    //console.log('touching');
  }
  else {
    //check if move was only horizontal
    if (rope[h].y == rope[h+1].y) {
      if (rope[h].x-1 > rope[h+1].x) {
        rope[h+1].x++;
      }
      else {        
        rope[h+1].x--;
      }
    }
    //check if move was only vertical
    else if (rope[h].x == rope[h+1].x) {
      if (rope[h].y-1 > rope[h+1].y) {
        rope[h+1].y++;
      }
      else {        
        rope[h+1].y--;
      }
    }
    //ok, move had to be diagonal
    else {
      if (rope[h].x > rope[h+1].x) {
        rope[h+1].x++;
      } else {
        rope[h+1].x--;
      }
      if (rope[h].y > rope[h+1].y) {
        rope[h+1].y++;
      } else {
        rope[h+1].y--;
      }
    }
  }
  visited.add(rope[maxknots].x+'-'+rope[maxknots].y);   
  //console.log('after move: ',rope);
  drawRope(msg);      
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