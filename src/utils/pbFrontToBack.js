/**
 * Génère un objet JSON associant des nombres aux lettres de 'a' à 't' en sautant 'i'.
 *
 * @function generateJson
 * @returns {Object} Un objet où les clés sont des nombres de 1 à 19 et les valeurs sont des lettres de 'a' à 't' (sans 'i').
 */
const generateJson = () => {
  const letters = 'abcdefghjklmnopqrst'; // 'i' est sauté
  const json = {};
  for (let i = 0; i < letters.length; i++) {
      json[i + 1] = letters[i];
  }
  return json;
};

const jsonData = generateJson();

/**
* Convertit les données de tsumego du format front-end au format back-end.
*
* @function pbFrontToBack
* @param {Object} stones - Les pierres sur le plateau, où les clés sont les coordonnées et les valeurs sont "black" ou "white".
* @param {string} solColor - La couleur de la solution ("black" ou "white").
* @param {string} solCoord - La coordonnée de la solution.
* @param {number} boardSize - La taille du plateau (9, 13, ou 19).
* @param {string} nextColor - La couleur de la prochaine pierre à jouer ("black" ou "white").
* @returns {Object} Les données de tsumego formatées pour le back-end.
*/
const pbFrontToBack = (stones, solColor, solCoord, boardSize, nextColor) => {
  let tsumegoForBack = {};
  tsumegoForBack["AB"] = [];
  tsumegoForBack["AW"] = [];
  tsumegoForBack["SZ"] = boardSize;
  tsumegoForBack["C"] = `${nextColor} to play`;
  tsumegoForBack["SOL"] = [[solColor == "white" ? "W" : "B", `${solCoord.substring(0, 1).toLowerCase()}${jsonData[solCoord.substring(1)]}`, "", ""]];
  
  Object.entries(stones).forEach(([key, value]) => {
      if (value == "black") {
          tsumegoForBack["AB"].push(`${key.substring(0, 1).toLowerCase()}${jsonData[key.substring(1)]}`);
      } else {
          tsumegoForBack["AW"].push(`${key.substring(0, 1).toLowerCase()}${jsonData[key.substring(1)]}`);
      }
  });
  
  console.log(tsumegoForBack);
  return tsumegoForBack;
};

export default pbFrontToBack;
