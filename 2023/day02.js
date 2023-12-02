const input = readInput("./day02.txt");
/* data structures:
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

gamesMaxColors = [
  [
    blue: 3 },
    red: 4 },
    green: 2 },
  ],
  ...
];
eg: gamesMaxColors[2][red] = 20;
*/ 

/* algo:
const ColorsMax = {
  red: 12,
  green: 13,
  blue: 14
};
Iterate over each game, fill up gamesMaxColors. 
Then iterate over gamesMaxColors and find the IDs of the games where all three colors are below the max in ColorsMax.
*/

const ColorsMax = {
  red: 12,
  green: 13,
  blue: 14
};
let gamesMaxColors = [];
for (var i = 0; i<input.length;i++) {
  line = input[i];
  //we just need to find the highest number of each color

  let currentMaxes = {
    red: 0,
    green: 0,
    blue: 0
  };  

  let lineRegex = /\s(\d+)\sred/g;
  const RedNumbers = line.matchAll(lineRegex);
  for (const match of RedNumbers) {
    const num = parseInt(match[1]);
    if (num > currentMaxes['red']) {
      currentMaxes['red'] = num;
    }
  }

  lineRegex = /\s(\d+)\sgreen/g;
  const GreenNumbers = line.matchAll(lineRegex);
  for (const match of GreenNumbers) {
    const num = parseInt(match[1]);
    if (num > currentMaxes['green']) {
      currentMaxes['green'] = num;
    }
  }

  lineRegex = /\s(\d+)\sblue/g;
  const BlueNumbers = line.matchAll(lineRegex);
  for (const match of BlueNumbers) {
    const num = parseInt(match[1]);
    if (num > currentMaxes['blue']) {
      currentMaxes['blue'] = num;
    }
  }

  gamesMaxColors.push(currentMaxes);
}
//console.log('Max colors in each game:', gamesMaxColors);

// first part
let gameID = 1;
let PossibleGames = 0;
for (const game of gamesMaxColors) {
  if (game['red'] <= ColorsMax['red'] && game['green'] <= ColorsMax['green'] && game['blue'] <= ColorsMax['blue']) {
    PossibleGames += gameID;
  }
  gameID++;
}

//second part
let gamePowers = 0;
for (const game of gamesMaxColors) {
  gamePowers += game['red'] * game['green'] * game['blue'];
}


console.log('First part:',PossibleGames);
console.log('Second part:',gamePowers);

function readInput(filename) {
  const fs = require('fs');

  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data.split(/\r?\n/);
  } catch (err) {
    console.error(err);
  }
}

