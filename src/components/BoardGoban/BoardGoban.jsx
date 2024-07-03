import React, { useState, useEffect, useMemo } from 'react';
import { Goban as ReactGoban } from 'react-goban';
import './Goban.css';
import { positionBoard, solutionData } from '../../utils/TreatmentData';

function BoardGoban() {
  // État local pour les positions des pierres
  const [stonesPlay, setStonesPlay] = useState({});
  // État local pour afficher la solution
  const [solution, setSolution] = useState([]);
  // État local pour afficher le message de succès
  const [successMessage, setSuccessMessage] = useState('');

  const data = useMemo(() => ({
    "AB": [
        "fb",
        "hb",
        "bc",
        "cc",
        "dc",
        "ec",
        "fc",
        "be"
    ],
    "AW": [
        "ab",
        "bb",
        "cb",
        "db",
        "eb"
    ],
    "SZ": "19",
    "C": "Black to play: Elementary",
    "SOL": [
        [
            "B",
            "ba",
            "",
            ""
        ],
        [
            "B",
            "ea",
            "",
            ""
        ],
        [
          "B",
          "ea",
          "",
          ""
      ]
    ]
  }), []);

  useEffect(() => {
    const initialStones = positionBoard(data['AB'], data['AW']);
    setStonesPlay(initialStones);

    const answers = solutionData(data.SOL);
    setSolution(answers);
  }, [data]);


  // Fonction pour gérer le clic sur une intersection
  const handleIntersectionClick = (intersection) => {
    setStonesPlay((prevStonesPlay) => {
      const newStonesPlay = { ...prevStonesPlay };
      // Ici, vous pouvez ajouter une logique pour ajouter une pierre
      newStonesPlay[intersection] = 'black'; // Exemple pour ajouter une pierre noire
      return newStonesPlay;
    });


    if (solution.includes(intersection)) {
      setSuccessMessage('Réussi, félicitations!');
    } else { 
      setSuccessMessage('Mauvais coup, essayez encore.');

      setTimeout(() => {
        setSuccessMessage(''); // Efface le message après 2 secondes
      }, 2000);
      
    }

  };

  return (
    <div className="goban-container">
      <div className='response-result'>
        {successMessage && <p>{successMessage}</p>} 
      </div>
      {/* Affichage de la solution */}
      <div className="solution-container">
        <p>Solution: {solution.join(', ')}</p>
      </div>

      {/* Plateau pour jouer */}
      <ReactGoban
        size="19"
        theme="classic"
        stones={stonesPlay}
        nextToPlay="black"
        onIntersectionClick={handleIntersectionClick}
      />
    </div>
  );
}

export default BoardGoban;
