import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  var safes = 0;
  input.split('\n').forEach(line => {
    if (isSafe(line)) {safes++;}
  });
  return safes;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

//function to tell if a line is safe (meaning: values change in one direction and difference is max 3)
function isSafe(line) {
  const values = line.split(' ').map(value => parseInt(value));
  if (values[0] === values[1]) {
    return false;    
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
        return false;
      }
    }
    //not growing
    else { 
      if ((values[i] - values[i+1] > 3) || (values[i] - values[i+1] < 1)) {
        return false;
      }
    }
  }
  return true;
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
