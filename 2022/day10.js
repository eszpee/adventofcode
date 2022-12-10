const input = readInput("./day10-sample.txt"); 
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
var hist_x = new Array;

//Process input to create code array
var code = new Array();
input.forEach(line => {
  var commands = line.split(' ');
  commands.unshift(runtime[commands[0]]);
  code.push(commands);
});

//Main loop to run code
var cpu_cycle = 1;                    //TODO: we probably won't need this
while (code.length>0) {
  console.log(cpu_cycle,code,reg_x);
  if (code[0][0] > 0) {
    code[0][0]--;
  }
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
  cpu_cycle++;
}
//hist_x.shift()                        //there's no 0th cpu cycle - but it's fine, we won't use it anyway
console.log(hist_x);

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}