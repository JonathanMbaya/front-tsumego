/**
 * Génère un tableau contenant les lettres de 'A' à 'T', sauf la lettre 'I'.
 * @module letters
 */

/**
 * Tableau des lettres de 'A' à 'T' sans la lettre 'I'.
 * @type {string[]}
 */
const letters = [];

/**
 * Code de caractère pour la lettre de début 'A'.
 * @type {number}
 */
const startCharCode = 'A'.charCodeAt(0);

/**
 * Code de caractère pour la lettre de fin 'T'.
 * @type {number}
 */
const endCharCode = 'T'.charCodeAt(0);

/**
 * Boucle pour générer les lettres de 'A' à 'T' et les ajouter au tableau `letters`,
 * en omettant la lettre 'I'.
 */
for (let i = startCharCode; i <= endCharCode; i++) {
  const letter = String.fromCharCode(i);
  if (letter !== 'I') {
    letters.push(letter);
  }
}

export default letters;
