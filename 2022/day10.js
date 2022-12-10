const input = readInput("./day10-sample2.txt"); 
/* data structures:
code[[1, 'noop'],[3,'addx'[6]]]   //processed input, adding run time to all commands, splitting parameters
                                  //idea is to simply iterate over this, and decrease run time at each cpu cycle, execute at 0
cpu_cycle                         //counting cpu cycles
reg_x                             //global value of register x
hist_x[1,5,6,-2,3]                //value of register x at the index'th cpu cycle
*/ 

/* algo:
1. prepare the code array from the input
2. main while until code.length > 0
    cpu cycle increase
    get next command
    if cpu cycle on command is > 0, decrease
    else remove command from code, execute command, log hist_x
3. check hist_x at every 20th occurrence
*/

const runtime = {
  noop: 1,
  addx: 2,
}
var reg_x = 1;
var hist_x = new Array(2);            //first item empty so we pad for the cpu cycles at the end
var crt = '';                         //only one row for now
var crt_index = 0;                    //pixel (column) being drawn

//Process input to create code array
var code = new Array();
input.forEach(line => {
  var commands = line.split(' ');
  commands.unshift(runtime[commands[0]]);
  code.push(commands);
});

//Main loop to run code. Every iteration is one CPU cycle.
var cpu_cycle = 0;
while (code.length>0) {

  cpu_cycle++;
  if (code[0][0] > 0) {
    code[0][0]--;
  }

  //console.log("\nStart cycle: ",cpu_cycle);
  //console.log(spritePosition(cpu_cycle));

  if (spriteOverlap(crt_index)) {
    crt += '#';
  }
  else {
    crt += '.';
  }
  if (crt_index == 39) {
    crt += '\n';
    crt_index = 0;
  }
  else {
    crt_index++;
  }
  //console.log("Current CRT row:",crt);

  if (code[0][0] == 0) {
    current_command = code.shift();
    switch (current_command[1]) {
      case 'noop':        
        break;
      case 'addx':
        reg_x += Number(current_command[2]);
        break;
    }
  }
  hist_x.push(reg_x);

}

var currCycle = 20;
var sum = 0;
while (true) {
  if (hist_x[currCycle]) {
    sum += hist_x[currCycle] * currCycle;
    currCycle+= 40;
  }
  else {
    break;
  }
}

console.log('First part:',sum);
console.log('Second part:');
console.log(crt);

function spriteOverlap(idx) {
  //input: index of the pixel being drawn
  //output: if the index is overlapping a sprite (based on reg_x) 
  return (Math.abs(idx-reg_x) <= 1); //sprites are 3 pixel wide 
}

function spritePosition() {
  var crtline = '';
  for (var i=0;i<40;i++) {
    if (spriteOverlap(i)) {
      crtline += '#';
    }
    else {
      crtline += '.';
    }
  }
  return ('Sprite position: '+crtline);
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