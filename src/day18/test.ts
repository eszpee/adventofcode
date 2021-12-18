import { exit } from 'process';
import {doExplode, doSplit, doReduce, addList, isNum} from './day18_utils';

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

const addListIn = [
    ['[1,1]',
    '[2,2]',
    '[3,3]',
    '[4,4]'],
    ['[1,1]',
    '[2,2]',
    '[3,3]',
    '[4,4]',
    '[5,5]'],
    ['[1,1]',
    '[2,2]',
    '[3,3]',
    '[4,4]',
    '[5,5]',
    '[6,6]'],
    [
        '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
        '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]'
    ],
     [
        '[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
        '[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
        '[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
        '[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
        '[7,[5,[[3,8],[1,4]]]]',
        '[[2,[2,2]],[8,[8,1]]]',
        '[2,9]',
        '[1,[[[9,3],9],[[9,0],[0,7]]]]',
        '[[[5,[7,4]],7],1]',
        '[[[[4,2],2],6],[8,7]]'        
    ]
 ];

const addListOut = [
    '[[[[1,1],[2,2]],[3,3]],[4,4]]',
    '[[[[3,0],[5,3]],[4,4]],[5,5]]',
    '[[[[5,0],[7,4]],[5,5]],[6,6]]',
    '[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]',
   '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
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

addListIn.forEach((testCase,index) => 
    test(`Add ${index}\n${testCase}`, () => {
        const added = addList(testCase);
        expect(added).toEqual(addListOut[index]);
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