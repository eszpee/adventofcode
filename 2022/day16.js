const input = readInput("./day16-sample.txt");
/* data structures:
valves[
  AA: { rate: 0, leads: [ 'DD', 'II', 'BB' ] },
  BB: { rate: 13, leads: [ 'CC', 'AA' ] },
  CC: { rate: 2, leads: [ 'DD', 'BB' ] },
  DD: { rate: 20, leads: [ 'CC', 'AA', 'EE' ] },
  EE: { rate: 3, leads: [ 'FF', 'DD' ] },
  FF: { rate: 0, leads: [ 'EE', 'GG' ] },
  GG: { rate: 0, leads: [ 'FF', 'HH' ] },
  HH: { rate: 22, leads: [ 'GG' ] },
  II: { rate: 0, leads: [ 'AA', 'JJ' ] },
  JJ: { rate: 21, leads: [ 'II' ] }
]
*/ 
/* algo:

*/
var valves = new Array();

for (var i = 0; i<input.length;i++) {
  var currValve = new Object();
  line = input[i];
  currValve.rate = Number(line.match(/=(\d+);/)[1]);
  currValve.leads = line.split(/valves? /)[1].split(', ');
  valves [line.match(/Valve ([A-Z]{2})/)[1]] = currValve;
}
console.log(valves);

console.log('First part:',);
console.log('Second part:',);

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}

