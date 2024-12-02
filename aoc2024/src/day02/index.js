import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  var safes = 0;
  input.split('\n').forEach(line => {
    if (isSafe(line)[0]) {safes++;}
  });
  return safes;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  var safes = 0;
  input.split('\n').forEach(line => {
    if (isSafe(line)[0]) {
      safes++;
    }
    else {

    }
  });
  return safes;
};

//function to tell if a line is safe (meaning: values change in one direction and difference is max 3)
//return boolean for safety and index on failure number if false
function isSafe(line) {
  const values = line.split(' ').map(value => parseInt(value));
  if (values[0] === values[1]) {
    return ([false,1]);
  }
  var growing;
  if (values[0] < values[1]) {
    growing = true;
  }
  if (values[0] > values[1]) {
    growing = false;
  }
  for (var i=0; i<values.length-1; i++) {
    if (growing) {
      if ((values[i+1] - values[i] > 3) || (values[i+1] - values[i] < 1)) {
        return ([false,i+1]);
      }
    }
    //not growing
    else { 
      if ((values[i] - values[i+1] > 3) || (values[i] - values[i+1] < 1)) {
        return ([false,i+1]);
      }
    }
  }
  return ([true,0]);
}

run({
  part1: {
    tests: [
      {
        input: `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9        
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9        
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
