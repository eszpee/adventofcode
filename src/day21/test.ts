import {throwPracticeDie, advance} from './day21_utils';

describe ('Practice game', () => {
    test('100-side deterministic', () => {
        expect(throwPracticeDie(1)).toEqual(2);
        expect(throwPracticeDie(100)).toEqual(1);
    });
    test('Advance', () => {
        expect(advance(1,2)).toEqual(3);
        expect(advance(7,5)).toEqual(2);
        expect(advance(10,1)).toEqual(1);
        expect(advance(9,1)).toEqual(10);
    });
}); 

