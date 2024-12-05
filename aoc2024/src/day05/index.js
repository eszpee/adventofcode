import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

const part1 = (rawInput) => {
  const [orders,tasks] = parseInput(rawInput);
  let pagesum = 0;
  const rules = orders.split('\n');

  // let rules = new Map();
  // orders.split("\n").forEach(item => {
  //   const [before, after] = item.split("|");
  //   if (!rules.has(before)) {
  //     rules.set(before, new Set());
  //   }
  //   rules.get(before).add(after);
  // });
  // if (rules.has("22") && rules.get("22").has("34")) {
  //   console.log("22 should be before 34");
  // } else {
  //   console.log("22 does not have to be before 34");
  // }

  let lineValid = new Array();
  tasks.split('\n').forEach(task => {
    var falseFound = false;
    const pages = task.split(',');
    for (let i = pages.length - 1; i >= 0; i--) {
      for (let j = i; j >= 0; j--) {
        const rule = `${pages[i]}|${pages[j]}`;
        if (rules.includes(rule)) {
          // console.log(`line ${task} breaks the rule ${rule}`)
          falseFound = true;
          break;
        }
      }
    }
    if (!falseFound) {
      lineValid.push(task);
      const midvalue = pages[Math.ceil((pages.length / 2)-1)];
      pagesum += parseInt(midvalue);
    }
  });

  return pagesum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
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
