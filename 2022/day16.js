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
while (true) { //(maxSteamout < 1650){
  iterations++;
  //close all valves...
  Object.keys(valves).forEach(v => {valves[v].closed = true;});
  var timer = 1;
  var roomMe = 'AA';
  var roomEl = 'AA';
  var steamout = 0;
  while (timer <= 26) {
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

    //One minute passes
    timer++;

    //During the minute I might decide to open the valve
    if (valves[roomMe].closed && valves[roomMe].rate > 0 && (Math.random() > (1/valves[roomMe].rate))) {        
      valves[roomMe].closed = false;
//      console.log('You open valve %s.',room);
    }
    //Or I might move 
    else {
      roomMe = valves[roomMe].leads[[Math.floor(Math.random() * valves[roomMe].leads.length)]];
//      console.log('You move to valve %s.',room);
    }

    //Also the elephant does the same...
    if (valves[roomEl].closed && valves[roomEl].rate > 0 && (Math.random() > (1/valves[roomEl].rate))) {        
      valves[roomEl].closed = false;
    }
    else {
      roomEl = valves[roomEl].leads[[Math.floor(Math.random() * valves[roomEl].leads.length)]];
    }
  }

  if (maxSteamout<steamout) {
    maxSteamout = steamout;
    console.log('Highest now:',maxSteamout);
  }
  if (iterations % 1000000 == 0) {
    console.log('Iterations so far:',iterations/1000000,'million. Highest now:',maxSteamout);
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

