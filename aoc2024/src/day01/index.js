import run from "aocrunner";

const parseInput = (rawInput) => {
  const lines = rawInput.split('\n');
  const leftSide = lines.map(line => parseInt(line.split(/\s+/)[0]));
  const rightSide = lines.map(line => parseInt(line.split(/\s+/)[1]));
  return [leftSide, rightSide];
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const leftSorted = input[0].sort();
  const rightSorted = input[1].sort();
  let sum = 0;
  for (let i=0; i<leftSorted.length;i++) {
    sum += Math.abs(leftSorted[i] - rightSorted[i]);
  }
  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const left = input[0];
  const right = input[1];
  const occurences = left.map(element => {
    return right.filter(r => r === element).length;
  });
  let sum = 0;
  for (let i=0; i<left.length;i++) {
    sum += left[i] * occurences[i];
  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `
3   4
4   3
2   5
1   3
3   9
3   3
      `,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
3   4
4   3
2   5
1   3
3   9
3   3
      `,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
