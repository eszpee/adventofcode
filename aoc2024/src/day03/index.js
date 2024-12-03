import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return calculateMultiplications(input);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return calculateMultiplications(input);
  return;
};

function calculateMultiplications(input) {
  let result = 0;
  let position = 0;
  let enabled = true;

  function readNumber() {
      let num = '';
      while (position < input.length && /[0-9]/.test(input[position])) {
          num += input[position];
          position++;
      }
      return num ? parseInt(num) : null;
  }

  function processMultiplication() {
      position += 4; // skip 'mul('
      
      const firstValue = readNumber();
      if (firstValue === null) return null;

      while (position < input.length && input[position] === ' ') position++;
      if (input[position] !== ',') return null;
      position++;

      const secondValue = readNumber();
      if (secondValue === null) return null;

      while (position < input.length && input[position] === ' ') position++;
      if (input[position] !== ')') return null;
      position++;

      return firstValue * secondValue;
  }

  while (position < input.length) {
      if (input.slice(position).startsWith('do()')) {
          enabled = true;
          position += 4;
      } else if (input.slice(position).startsWith("don't()")) {
          enabled = false;
          position += 7;
      } else if (input.slice(position).startsWith('mul(')) {
          if (enabled) {
              const value = processMultiplication();
              if (value !== null) result += value;
          }
          position++;
      } else {
          position++;
      }
  }

  return result;
}
run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
