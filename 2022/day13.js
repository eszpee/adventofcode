const input = readInput("./day13-sample.txt");
/* data structures:

*/ 
/* algo:

*/

for (var i = 0; i<input.length;i++) {
  line = input[i];

}
var left = string2array('[1]');
var right = string2array('[2]');
console.log(compare(left,right));
function string2array(s) {
  return eval(s);
}


//console.log('First part:',);
//console.log('Second part:',);

function compare(leftorig,rightorig) {
  //takes: two arrays
  //returns: true if they are in order, false if not
  console.log('comparing',leftorig,'to',rightorig);
  left = leftorig.shift();
  right = rightorig.shift();
  console.log('first items:',left,right);
  if (left == undefined) { return true;  }
  if (right == undefined) { return false; }
  if (isNaN(left) && isNaN(right)) {
    //both are arrays
  } 
  else if (isNaN(left)) {
    //left is array, right is number
  }
  else if (isNaN(right)) {
    //right is array, left is number
  }
  else {
    //both are numbers
    if (left < right) {return true;}
    else if (left > right) {return false;}
    //need to continue if they are the same
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

