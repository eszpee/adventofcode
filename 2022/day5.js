const inputArray = readInput("./day5.txt"); /*
 [
'    [D]    ',
'[N] [C]    ',
'[Z] [M] [P]',
 '1   2   3 ',
'',
'move 1 from 2 to 1',
'move 3 from 1 to 3',
'move 2 from 2 to 1',
'move 1 from 1 to 2',
]; //*/

/* data structure to fill out:
platforms[] = [['Z','N',''],['M','C','D'],['P','','']]    <= this is transposed!!! so we'll have easy crane operation
moves[] = [[1,2,1],[3,1,3]...]
*/

var platforms = new Array;
platforms = [[],[],[],[],[],[],[],[],[]
];
var moves = new Array;

for (var line = 0; line < inputArray.length; line++){
  console.log(inputArray[line]);
  // replace '   ' to [] so we have empty elements at place
  inputArray[line] = inputArray[line].replace(/    /g,"[]");
  
  switch (inputArray[line].charAt(0)) {
    case '[':
      console.log('crates');
      var regex = new RegExp('\\[([^\\]]*)\\]', 'g');
      var matches;
      var platform = 0;
      while ((matches = regex.exec(inputArray[line])) !== null) {
        if (matches[1]) { platforms[platform].unshift(matches[1]); };
        platform++;
      }

      break;
  
    case 'm':
      console.log('moves');
      var regex = new RegExp(/(\d+)/, 'g');
      var matches;
      var command = new Array;
      while ((matches = regex.exec(inputArray[line])) !== null) {
        command.push(matches[1]);
      }
      console.log("moving",command[0],"pieces from",command[1],"to",command[2]);
      command[1]--;
      command[2]--;

      var tempcrates = new Array();
      for (var i=1;i<=command[0];i++) {
        tempcrates.push(platforms[command[1]].pop());
      }
      for (var i=1;i<=command[0];i++) {
        platforms[command[2]].push(tempcrates.pop());
      }

      console.log("platforms after move:",platforms);
      break;

    default:
      break;
  }

}
console.log(platforms);

var topcrates='';

for (var i=0;i<platforms.length;i++) {
  topcrates+=platforms[i].pop();
}

console.log("First part: ",topcrates);




function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}