import { solutionData, positionBoard } from './TreatmentData';

describe('Tests pour TreatmentData', () => {

    test('solutionData retourne la solution correcte tsemuji', () => {
        const inputSolution = [
            ["B", "qs", "", ""],
            ["W", "sr", "", ""]
        ];
        const expectedOutput = ["Q19", "S18"];
        expect(solutionData(inputSolution)).toEqual(expectedOutput);
    });

    test('positionBoard récupére les positions des pierres', () => {
    const blackStones = ["lq", "lp", "nq"];
    const whiteStones = ["sr", "qr", "rq"];
    const expectedBoard = {
        L17: 'black',
        L16: 'black',
        N17: 'black',
        S18: 'white',
        Q18: 'white',
        R17: 'white'
    };
    expect(positionBoard(blackStones, whiteStones)).toEqual(expectedBoard);
    });

});
