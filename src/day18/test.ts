import {doExplode, doSplit, doReduce, isNum} from './day18_utils';

const explodeIn = [
    '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
    '[[[[[9,8],1],2],3],4]',
    '[7,[6,[5,[4,[3,2]]]]]',
    '[[6,[5,[4,[3,2]]]],1]',
    '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'
];

const explodeOut = [
    '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
    '[[[[0,9],2],3],4]',
    '[7,[6,[5,[7,0]]]]',
    '[[6,[5,[7,0]]],3]',
    '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
];

const splitIn = [
    '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
    '[[[0,7],4],[15,1]]',
    '[[[[0,7],4],[15,[0,13]]],[1,1]]',
];

const splitOut = [
    '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
    '[[[0,7],4],[[7,8],1]]',
    '[[[[0,7],4],[[7,8],[0,13]]],[1,1]]',
];

const reduceIn = [
    '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
    '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]',
];

const reduceOut = [
    '[[3,[2,[8,0]]],[9,[5,[7,0]]]]',
    '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]',
];

explodeIn.forEach((testCase,index) => 
    test(`Explode ${index}\n${testCase}`, () => {
        const exploded = doExplode(testCase);
        expect(exploded).toEqual(explodeOut[index]);
      })
);

splitIn.forEach((testCase,index) => 
    test(`Split ${index}\n${testCase}`, () => {
        const split = doSplit(testCase);
        expect(split).toEqual(splitOut[index]);
      })
);

reduceIn.forEach((testCase,index) => 
    test(`Reduce ${index}\n${testCase}`, () => {
        const reduced = doReduce(testCase);
        expect(reduced).toEqual(reduceOut[index]);
      })
);



test(`isNum 1`, () => {
    expect(isNum('0')).toEqual(true);
});
test(`isNum 2`, () => {
    expect(isNum('[')).toEqual(false);
});
test(`isNum 3`, () => {
    expect(isNum('')).toEqual(false);
});
