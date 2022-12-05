const inputArray = //readInput("./day4.txt"); /*
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
platforms = [[],[],[]];
var moves = new Array;

for (var line = 0; line < inputArray.length; line++){
  // replace '   ' to [] so we have empty elements at place
  inputArray[line] = inputArray[line].replace(/   /g,"[]");
  
  switch (inputArray[line].charAt(0)) {
    case '[':
      console.log('crates');
      var regex = new RegExp('\\[([^\\]]*)\\]', 'g');
      var matches;
      var platform = 0;
      while ((matches = regex.exec(inputArray[line])) !== null) {
        platforms[platform].unshift(matches[1]);
        platform++;
      }

      break;
  
    case 'm':
      console.log('moves')
      break;

    default:
      break;
  }
  console.log(inputArray[line]);

}
console.log(platforms);

//console.log("First part: ",sum);




function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}