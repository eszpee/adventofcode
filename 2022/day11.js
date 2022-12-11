const input = readInput("./day11-sample.txt"); 
const maxmonkeys = 3;
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

monkeys = new Array();               //it's a competition, not for display! :D
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
/*
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3
*/
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



console.log(monkeys);

console.log('First part:');
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