const input = readInput("./day9-sample.txt"); /*

/* data structures:
head{x: 1, y: 2}
tail{x: 1, y: 3}
visited: Set('1-3')                         //coordinates of visited places
*/ 



console.log("First part:",);
console.log("Second part:",);





function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}