import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const letters = input.split('\n');
  const maxRow = letters.length;
  const maxCol = letters[0].length;
  // console.log(`Max Row: ${maxRow}, Max Col: ${maxCol}`);
  let xmasSum = 0;

  function letterSearch(row,col,letter) {
    // console.log(`Searching for letter ${letter} at row ${row}, col ${col}`);
    if ((row < 0) || (col < 0)) { return false;}
    if ((row >= maxRow) || (col > maxCol)) { return false;}
    if (letters[row].charAt(col) === letter) {
      return true;
    }
    return false;
  }

  const directions = [
    [-1,-1],[-1, 0],[-1, 1],
    [ 0,-1],        [ 0, 1],
    [ 1,-1],[ 1, 0],[ 1, 1]
  ];

  for (let currentRow = 0; currentRow < maxRow; currentRow++) {
    for (let currentCol = 0; currentCol < maxCol; currentCol++) {
      if (letterSearch(currentRow,currentCol,'X')) {
        for (const [dirRow, dirCol] of directions) {
          if (
            (letterSearch(currentRow+(1*dirRow),currentCol+(1*dirCol),'M')) &&
            (letterSearch(currentRow+(2*dirRow),currentCol+(2*dirCol),'A')) &&
            (letterSearch(currentRow+(3*dirRow),currentCol+(3*dirCol),'S'))
          ) {
            xmasSum++;
          }
        }
      }
    }
  }

  return xmasSum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const letters = input.split('\n');
  const maxRow = letters.length;
  const maxCol = letters[0].length;
  // console.log(`Max Row: ${maxRow}, Max Col: ${maxCol}`);
  let xmasSum = 0;

  function letterSearch(row,col,letter) {
    // console.log(`Searching for letter ${letter} at row ${row}, col ${col}`);
    if ((row < 0) || (col < 0)) { return false;}
    if ((row >= maxRow) || (col > maxCol)) { return false;}
    if (letters[row].charAt(col) === letter) {
      return true;
    }
    return false;
  }

  for (let currentRow = 0; currentRow < maxRow; currentRow++) {
    for (let currentCol = 0; currentCol < maxCol; currentCol++) {
      if (letterSearch(currentRow,currentCol,'A')) {
        if (
          (letterSearch(currentRow-1,currentCol-1,'M')) &&
          (letterSearch(currentRow+1,currentCol+1,'S')) &&
          (letterSearch(currentRow-1,currentCol+1,'M')) &&
          (letterSearch(currentRow+1,currentCol-1,'S'))
        ) { xmasSum++; }
        else if (
          (letterSearch(currentRow-1,currentCol-1,'S')) &&
          (letterSearch(currentRow+1,currentCol+1,'M')) &&
          (letterSearch(currentRow-1,currentCol+1,'S')) &&
          (letterSearch(currentRow+1,currentCol-1,'M'))
        ) { xmasSum++; }
        else if (
          (letterSearch(currentRow-1,currentCol-1,'M')) &&
          (letterSearch(currentRow+1,currentCol+1,'S')) &&
          (letterSearch(currentRow-1,currentCol+1,'S')) &&
          (letterSearch(currentRow+1,currentCol-1,'M'))
        ) { xmasSum++; }
        else if (
          (letterSearch(currentRow-1,currentCol-1,'S')) &&
          (letterSearch(currentRow+1,currentCol+1,'M')) &&
          (letterSearch(currentRow-1,currentCol+1,'M')) &&
          (letterSearch(currentRow+1,currentCol-1,'S'))
        ) { xmasSum++; }
      }
    }
  }

  return xmasSum;
};

run({
  part1: {
    tests: [
      {
        input: 
`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: 
`.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
