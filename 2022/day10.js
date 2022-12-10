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

input.forEach(line => {
});



function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}