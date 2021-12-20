import {deepCopy, cropImage, bin2dec, enhance, litPixels} from './day20_utils';

let sampleAlgo = '..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#';
sampleAlgo = sampleAlgo.replace(/\./g,'0');
sampleAlgo = sampleAlgo.replace(/#/g,'1');

const sampleImage = [
    '10010',
    '10000',
    '11001',
    '00100',
    '00111'
];


describe('Helpers', () => {
    test('deepCopy', () => {
        const a = [[0,1],[2,3]];
        const b:number[][] = deepCopy(a);
        b[0][1] = 2;
        expect(a).toEqual([[0,1],[2,3]]);
        expect(b).toEqual([[0,2],[2,3]]);
    });
    test('bin2dec', () => {
        expect(bin2dec('0000')).toEqual(0);
        expect(bin2dec('1000')).toEqual(8);
        expect(bin2dec('11111111')).toEqual(255);
    })
});

describe('cropImage', () => {
    test ('Nothing to crop', () => {
        expect(cropImage([
            '1000000',
            '0000100',
            '0011100',
            '1111111',
            '0000000',
            '0001000'
        ])).toEqual([
            '00000000000',
            '00000000000',
            '00100000000',
            '00000010000',
            '00001110000',
            '00111111100',
            '00000000000',
            '00000100000',
            '00000000000',
            '00000000000'
        ]);
    });
    test ('Crop top and bottom only', () => {
        expect(cropImage([
                '0000000',
                '0000000',
                '0000100',
                '0011100',
                '1111111',
                '0000000',
                '0001000',
                '0000000'
            ])).toEqual([
                '00000000000',
                '00000000000',
                '00000010000',
                '00001110000',
                '00111111100',
                '00000000000',
                '00000100000',
                '00000000000',
                '00000000000'
        ]);
    });
    test ('Crop left only', () => {
            expect(cropImage([
                '0000100',
                '0000000',
                '0000100',
                '0011100',
                '0011111',
                '0000000',
                '0001000',
                '0000001'
            ])).toEqual([
                '000000000',
                '000000000',
                '000010000',
                '000000000',
                '000010000',
                '001110000',
                '001111100',
                '000000000',
                '000100000',
                '000000100',
                '000000000',
                '000000000'
        ]);
    });
    test ('Crop right only', () => {
        expect(cropImage([
            '0010000',
            '0000000',
            '0010000',
            '1110000',
            '1111110',
            '0000000',
            '0100000',
            '0000100'
        ])).toEqual([
            '0000000000',
            '0000000000',
            '0000100000',
            '0000000000',
            '0000100000',
            '0011100000',
            '0011111100',
            '0000000000',
            '0001000000',
            '0000001000',
            '0000000000',
            '0000000000'
    ]);
    });
    test ('Complex crop', () => {
        expect(cropImage([
            '1010000',
            '0000000',
            '0010000',
            '1110000',
            '1110100',
            '0000000',
            '0100000',
            '0000000'
        ])).toEqual([
            '000000000',
            '000000000',
            '001010000',
            '000000000',
            '000010000',
            '001110000',
            '001110100',
            '000000000',
            '000100000',
            '000000000',
            '000000000'
    ]);
    });
});

describe('enhance', () => {
    const image = sampleImage;
    test('Sample from task', () => {
        expect(enhance(image,sampleAlgo)).toEqual([
            '00000000000',
            '00000000000',
            '00011011000',
            '00100101000',
            '00110100100',
            '00111100100',
            '00010011000',
            '00001100100',
            '00000101000',
            '00000000000',
            '00000000000'
        ]);
    });
    test('Second sample from task', () => {
        expect(enhance(enhance(image,sampleAlgo),sampleAlgo)).toEqual([
            '0000000000000',
            '0000000000000',
            '0000000001000',
            '0001001010000',
            '0010100011100',
            '0010001101000',
            '0010000010100',
            '0001011111000',
            '0000101111100',
            '0000011011000',
            '0000001110000',
            '0000000000000',
            '0000000000000'
        ]);
    })
});

describe ('litPixels', () => {
    test('Simple test', () => {
        expect(litPixels(['11010101','11100000'])).toEqual(8);
    })
})

describe('Complete sample test', () => {
    test('First part', () => {
        expect(litPixels(enhance(enhance(sampleImage,sampleAlgo),sampleAlgo))).toEqual(35);
    });
});