const dataTest = {
    "A": 1,
    "B": 2,
    "C": 3,
    "D": 4,
    "E": 5,
    "F": 6,
    "G": 7,
    "H": 8,
    "I": 9,
    "J": 10,
    "K": 11,
    "L": 12,
    "M": 13,
    "N": 14,
    "O": 15,
    "P": 16,
    "Q": 17,
    "R": 18,
    "S": 19,
    "T": 20,
    "U": 21,
    "V": 22,
    "W": 23,
    "X": 24,
    "Y": 25,
    "Z": 26
};

/**
 * Convertit les solutions en coordonnées de plateau.
 *
 * @function solutionData
 * @param {Array} solutions - Tableau de solutions, chaque solution est un tableau contenant une chaîne de caractères.
 * @returns {Array} Un tableau de chaînes de caractères représentant les coordonnées de plateau.
 */
export function solutionData(solutions) {
    return solutions.map(solution => {
        const row = solution[1].substring(0, 1).toUpperCase();
        const col = dataTest[solution[1].substring(1).toUpperCase()];
        return `${row}${col}`;
    });
}

/**
 * Positionne les pierres noires et blanches sur le plateau.
 *
 * @function positionBoard
 * @param {Array} blackStones - Tableau de coordonnées des pierres noires.
 * @param {Array} whiteStones - Tableau de coordonnées des pierres blanches.
 * @returns {Object} Un objet représentant les positions des pierres sur le plateau.
 */
export function positionBoard(blackStones, whiteStones) {
    const board = {};

    blackStones.forEach(element => {
        const row = element.substring(0, 1).toUpperCase();
        const col = dataTest[element.substring(1).toUpperCase()];
        board[`${row}${col}`] = 'black';
    });

    whiteStones.forEach(element => {
        const row = element.substring(0, 1).toUpperCase();
        const col = dataTest[element.substring(1).toUpperCase()];
        board[`${row}${col}`] = 'white';
    });

    return board;
}
