const input = readInput("./day11-sample.txt"); const maxmonkeys = 3; //should change together
const rounds = 10000;
/* data structures:
monkeys[] {
  items:Array(),
  operation:'* 6',
  test:7,     //divisibility
  throw:{ true: 5, false: 6 }
  inspects: 0
}
*/ 

/* algo:
  process input to create monkeys[]
  loop for rounds (20)
    loop for monkeys 
      loop for items
        Monkey inspects an item with a worry level of 79.
        Increase inspect counter for monkey
        Worry level is multiplied by 19 to 1501.
        Monkey gets bored with item. Worry level is divided by 3 to 500.
        Current worry level is not divisible by 23.
        Item with worry level 500 is thrown to monkey 3.
  print the multiplication of the two highest inspect levels for first solution

  algo day 2:
    - add to round_results[] array after every round:
        inspects[]          //number of inspections for every monkey
        delta_inspects[]    //difference in number of inspections for every monkey
    - check for a few hundred rounds and see if there's any pattern... namely, same amount of delta after x round
    - calculate for 10000 rounds: start+(10000/cycle)*diff, or something like that
    - multiply highest two
*/

var monkeys = new Array();               //it's a competition, not for display! :D
for (var i=0;i<=maxmonkeys;i++) {
  monkeys[i] = {
    items: [],
    operation: '',
    test: 1000,     //divisibility
    throw: { true: 1000, false: 1000},
    inspects: 0  
  }
}

var round_results = new Array();
for (var i=1; i<=rounds;i++) {
  round_results[i] = {
    inspects: [],
    delta_inspects: []
  }
}

var currentmonkey = -1;
for (var i = 0; i<input.length;i++) {
  line = input[i];
  if (line.charAt(0) == 'M') {
    currentmonkey++;        //assume monkeys are in order...
  }
  else if (line.charAt(2) == 'S') {
    line.split(': ')[1].split(', ').map(x => monkeys[currentmonkey].items.push(Number(x)));
  }
  else if (line.charAt(2) == 'O') {
    monkeys[currentmonkey].operation = line.split('old ')[1];
  }
  else if (line.charAt(2) == 'T') {
    monkeys[currentmonkey].test = Number(line.split('by ')[1]);
  }
  else if (line.charAt(2) == 'T') {
    monkeys[currentmonkey].test = Number(line.split('by ')[1]);
  }
  else if (line.charAt(7) == 't') {
    monkeys[currentmonkey].throw.true = Number(line.split('monkey ')[1]);
  }
  else if (line.charAt(7) == 'f') {
    monkeys[currentmonkey].throw.false = Number(line.split('monkey ')[1]);
  }
  else {
    //nah
  }
}


for (var round = 1; round <= rounds; round++) {
  for (var monkey = 0; monkey <= maxmonkeys; monkey++) {
    while (monkeys[monkey].items.length > 0) {
      var worry = monkeys[monkey].items.shift();
      monkeys[monkey].inspects++;
      if (monkeys[monkey].operation.split(' ')[0] == '+') {
        if (isNaN(Number(monkeys[monkey].operation.split(' ')[1]))) {
          worry = worry + worry;
        }
        else {
          worry += Number(monkeys[monkey].operation.split(' ')[1]);
        }
      }
      else {
        if (isNaN(Number(monkeys[monkey].operation.split(' ')[1]))) {
          worry = worry * worry;
        }
        else {
          worry = worry * Number(monkeys[monkey].operation.split(' ')[1]);
        }
      }
      //worry = Math.floor(worry / 3);
      var throwto = 0;
      if (worry % monkeys[monkey].test == 0) {
        throwto = monkeys[monkey].throw.true;
      }
      else {
        throwto = monkeys[monkey].throw.false;
      }
      monkeys[throwto].items.push(worry);
    }
  }
  for (var m=0;m<=maxmonkeys;m++) {
    round_results[round].inspects[m] = monkeys[m].inspects;
    if (round > 1) {
      round_results[round].delta_inspects[m] = round_results[round].inspects[m] - round_results[round-1].inspects[m];
    }
    else {
      round_results[round].delta_inspects[m] = round_results[round].inspects[m];
    }
  }
}

//console.log(round_results);
console.log(1,round_results[1]);
console.log(20,round_results[20]);
console.log(1000,round_results[1000]);
console.log(2000,round_results[2000]);
console.log(10000,round_results[10000]);

var count_inspects = new Array();
monkeys.forEach(m => {
  count_inspects.push(m.inspects);
});
count_inspects.sort((a, b) => b-a);
console.log('First part:',count_inspects[0]*count_inspects[1]);
console.log('Second part:');

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}

