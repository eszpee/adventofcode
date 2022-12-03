const inputArray = //  inputfile.readInputArray('day3.txt'); /*
 [
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg',
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw'
]; //*/

var sum = 0;

for (var i=0;i<inputArray.length;i++) {
    sum += getPriority(commonLetters(halfen(inputArray[i])[0],halfen(inputArray[i])[1])[0]);
}

console.log(sum);

function halfen(s) {
    //returns an array of two strings, input split to two parts
    return [s.substring(0, s.length / 2),s.substring(s.length / 2)];
}
function commonLetters(str1, str2) {
    // Split the strings into arrays of characters
    var chars1 = str1.split("");
    var chars2 = str2.split("");
  
    // Filter the first array of characters to only keep the ones that are also in the second array
    var common = chars1.filter(char => chars2.includes(char));
  
    // Return the array of common characters
    return common;
  }

  function getPriority(ch) {
    // Check if the character is a lowercase letter
    if (ch >= "a" && ch <= "z") {
      // Return the priority of the lowercase letter
      return ch.charCodeAt(0) - "a".charCodeAt(0) + 1;
    }
    // Check if the character is an uppercase letter
    else if (ch >= "A" && ch <= "Z") {
      // Return the priority of the uppercase letter
      return ch.charCodeAt(0) - "A".charCodeAt(0) + 27;
    }
    // If the character is not a letter, return 0
    else {
      return 0;
    }
  }