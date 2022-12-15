const input = readInput("./day15-sample.txt");
//const row_to_check = 10; //2000000;
const maxcoord = 20;

/* data structures:

*/ 
/* algo:

*/
for (var row_to_check = 0; row_to_check <= maxcoord; row_to_check++) {

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

  var checkedRow = new Array(maxcoord).fill('.');

  for (var i=0; i<dotsToDraw.length; i++) {
    for (var d=dotsToDraw[i][0]; d<=dotsToDraw[i][1]; d++ ) {logPoint(d);}
  }
  console.log(row_to_check,checkedRow.join(''));
}

console.log('First part:',checkedRow.join('').match(/\#/g).length-1);
console.log('Second part:',);

function logPoint(x) {
  x -= smallestX;
  if (x <= maxcoord) {
    checkedRow[x] = '#';
  }
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

