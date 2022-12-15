const input = readInput("./day15.txt");
const row_to_check = 2000000;

/* data structures:

*/ 
/* algo:

*/

var sensors = new Array();
for (var i = 0; i<input.length;i++) {
  sensors.push(input[i].split(':').map(x => x.match(/([\-\d]+)/g)));
}

var smallestX = Infinity;
var highestX = -Infinity;
var dotsToDraw = new Array();
for (var i=0; i<sensors.length; i++) {
  var sensorX = Number(sensors[i][0][0]);
  var sensorY = Number(sensors[i][0][1]);
  var beaconX = Number(sensors[i][1][0]);
  var beaconY = Number(sensors[i][1][1]);
  var distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
  if (smallestX > sensorX) { smallestX = sensorX; }
  if (smallestX > beaconX) { smallestX = beaconX; }
  if (highestX < sensorX) { highestX = sensorX; }
  if (highestX < beaconX) { highestX = beaconX; }
  //console.log (sensors[i], distance);

  var cx = '';
  var dx = '';
  if (((sensorY < row_to_check) && (sensorY+distance < row_to_check)) ||
      ((sensorY > row_to_check) && (sensorY-distance > row_to_check))) {
        ;
  }
  else {
    cx = sensorX-distance + Math.abs(sensorY-row_to_check);
    dx = sensorX+distance - Math.abs(sensorY-row_to_check);
  }
  dotsToDraw.push([cx,dx]);
  if (highestX < dx) {
    highestX = dx;
  }
  if (smallestX > cx) {
    smallestX = cx;
  }
}

var checkedRow = new Array(highestX-smallestX).fill('.');

for (var i=0; i<dotsToDraw.length; i++) {
  for (var d=dotsToDraw[i][0]; d<=dotsToDraw[i][1]; d++ ) {logPoint(d);}
}

console.log('First part:',checkedRow.join('').match(/\#/g).length-1);
console.log('Second part:',);

function logPoint(x) {
  x -= smallestX;
  checkedRow[x] = '#';
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

