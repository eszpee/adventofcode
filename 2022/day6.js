const input = //readInput("./day6.txt"); /*
// [
'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
//]; //*/

//iterate pointer over string
//console.log(fourDifferent('abta'));
//console.log(fourDifferent('kepz'));

var pointer = 3;

while (true) {
  var substr = input.charAt(pointer-3)+input.charAt(pointer-2)+input.charAt(pointer-1)+input.charAt(pointer);
  pointer++;
  if (fourDifferent(substr)) {
    console.log('first part:',pointer);
    break;
  }
}


function fourDifferent(str) {
//takes four characters
//returns true if all different, otherwise false
  var chars = new Array();
  chars = str.split('');
  chars.sort();
//  console.log(chars);
  var alldifferent = true;
  for (i=1;i<chars.length;i++) {
    if (chars[i-1] === chars [i]) {
      alldifferent = false;
      break;
    }
  }
  return alldifferent;

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