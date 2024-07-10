const generateJson = () => {
    const letters = 'abcdefghjklmnopqrst'; // 'i' est sauté
    const json = {};
    for (let i = 0; i < letters.length; i++) {
      json[i + 1] = letters[i];
    }
    return json;
  };
  
  const jsonData = generateJson();

const pbFrontToBack = (stones, solColor, solCoord, boardSize, nextColor) => {
    let tsumegoForBack = {}
    tsumegoForBack["AB"] = []
    tsumegoForBack["AW"] = []
    tsumegoForBack["SZ"] = boardSize
    tsumegoForBack["C"] = `${nextColor} to play`
    tsumegoForBack["SOL"] = [[solColor == "white"? "W": "B", `${solCoord.substring(0, 1).toLowerCase()}${jsonData[solCoord.substring(1)]}`, "", ""]]
    Object.entries(stones).forEach(([key, value]) => {
        if (value == "black")
            tsumegoForBack["AB"].push(`${key.substring(0, 1).toLowerCase()}${jsonData[key.substring(1)]}`)
        else
            tsumegoForBack["AW"].push(`${key.substring(0, 1).toLowerCase()}${jsonData[key.substring(1)]}`)
    })
    console.log(tsumegoForBack)
    return tsumegoForBack
}

export default pbFrontToBack