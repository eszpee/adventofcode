const input = readInput("./day16.txt");
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
var maxrate = 0;
for (var i = 0; i<input.length;i++) {
  var currValve = new Object();
  line = input[i];
  currValve.rate = Number(line.match(/=(\d+);/)[1]);
  if (maxrate < currValve.rate) {maxrate = currValve.rate;}
  currValve.leads = line.split(/valves? /)[1].split(', ');
  currValve.closed = true;
  valves [line.match(/Valve ([A-Z]{2})/)[1]] = currValve;
}
var iterations = 0;
var maxSteamout = 0;
var abandon = false;
while (!abandon) { //(maxSteamout < 1650){
  iterations++;
  //close all valves...
  Object.keys(valves).forEach(v => {valves[v].closed = true;});
  var timer = 1;
  var room = 'AA';
  var steamout = 0;
  var halftime = 0;
  while (timer <= 30) {
//    console.log('\n== Minute %s ==',timer);
    Object.keys(valves).forEach(v => {
      if (!valves[v].closed) {
//        console.log('Valve %s is open, releasing %s pressure.',v,valves[v].rate);
        steamout+= valves[v].rate
//        console.log('Combined steam released: ',steamout)
      }
    });
    if (steamout == 0) {
//      console.log("No valves are open.");
    }
    
    //we might decide to open the valve
    if (valves[room].closed && valves[room].rate > 0 && (Math.random() > (1/valves[room].rate))) {        
      timer++;
      valves[room].closed = false;
//      console.log('You open valve %s.',room);
    }
    // we should move 
    else {
      room = valves[room].leads[[Math.floor(Math.random() * valves[room].leads.length)]];
      timer++;
//      console.log('You move to valve %s.',room);
    }
  }
  if (maxSteamout<steamout) {
    maxSteamout = steamout;
    console.log('Highest now:',maxSteamout);
  }
  if (halftime < steamout) {
    halftime = steamout;
  }
  if (timer == 15) {
    if (steamout<halftime) {
      abandon = true;
    }
  }
  if (iterations % 100000 == 0) {
    console.log('Iterations so far:',iterations,'Highest now:',maxSteamout);
  }
}
console.log('First part:',maxSteamout,'(in',iterations,'iterations)');
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

