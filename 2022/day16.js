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
const valveRand = 0.2;
for (var i = 0; i<input.length;i++) {
  var currValve = new Object();
  line = input[i];
  currValve.rate = Number(line.match(/=(\d+);/)[1]);
  currValve.leads = line.split(/valves? /)[1].split(', ');
  currValve.closed = true;
  valves [line.match(/Valve ([A-Z]{2})/)[1]] = currValve;
}

var maxSteamout = 0;
while (maxSteamout < 1){ //1651) {
  var timer = 1;
  var room = 'AA';
  var steamout = 0;
  while (timer < 30) {
    //add released steam from all open valves
    Object.values(valves).forEach(v => {
      if (!v.closed) {
        console.log('Open valve:',v);
        steamout+= v.rate
        console.log('Steam out',steamout)
      }
    });
    
    //we might decide to open the valve
    if (valves[room].closed && valves[room].rate > 0 && (Math.random() > valveRand)) {        
      timer++;
      console.log(timer,'Opened valve');
      valves[room].closed = false;
    }
    // we should move to move
    room = valves[room].leads[[Math.floor(Math.random() * valves[room].leads.length)]];           //TODO randomness!
    timer++;
    console.log(timer,'Moved');
  }
  if (maxSteamout<steamout) {
    maxSteamout = steamout;
    console.log('Highest now:',maxSteamout);
  }
}
console.log('First part:',maxSteamout);
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

