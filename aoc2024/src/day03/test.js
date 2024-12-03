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

// Test cases
console.log(calculateMultiplications("mul(4,5)")); // 20
console.log(calculateMultiplications("do()mul(4,5)")); // 20
console.log(calculateMultiplications("don't()mul(4,5)")); // 0
console.log(calculateMultiplications("don't()mul(4,5)do()mul(2,3)")); // 6
console.log(calculateMultiplications("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")); // 48