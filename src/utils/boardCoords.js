// Générer un tableau contenant les lettres de 'A' à 'T' sauf la lettre 'I'
const letters = [];
const startCharCode = 'A'.charCodeAt(0);
const endCharCode = 'T'.charCodeAt(0);

for (let i = startCharCode; i <= endCharCode; i++) {
  const letter = String.fromCharCode(i);
  if (letter !== 'I') {
    letters.push(letter);
  }
}

export default letters