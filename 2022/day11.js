const input = readInput("./day11-sample.txt"); const maxmonkeys = 3; //should change together
const rounds = 20;
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
/*
      loop for items
        Monkey inspects an item with a worry level of 79.
        Increase inspect counter for monkey
        Worry level is multiplied by 19 to 1501.
        Monkey gets bored with item. Worry level is divided by 3 to 500.
        Current worry level is not divisible by 23.
        Item with worry level 500 is thrown to monkey 3.

*/
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
      worry = Math.floor(worry / 3);
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
}

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
