import React, { useState, useEffect, useRef } from 'react';
import {redirect} from 'react-router-dom';
import { Goban as ReactGoban } from 'react-goban';
import './Goban.css';

const Goban = () => {
//   const initialStones = {
//     "P16": "black",
//     "Q4": "white",
//     "D4": "black",
//     "E16": "white"
//   };

  const problemsRef = useRef(
    {"AB": ["fb", "hb", "bc", "cc", "dc", "ec", "fc", "be"], "AW": ["ab", "bb", "cb", "db", "eb"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "", ""], ["B", "ea", "", ""]]}
  );

//   const navigate = useNavigate();

  // État local pour les positions des pierres
  const [stonesPlay, setStonesPlay] = useState({});
  // État local pour la couleur du prochain joueur à jouer
  const [nextPlayer, setNextPlayer] = useState('black'); // Initialisation avec 'black'
  // État local pour afficher la solution
  const [solution, setSolution] = useState('');
  // État local pour afficher le message de succès
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const letterPositions = letters.reduce((acc, letter, index) => {
      acc[letter] = index;
      return acc;
    }, {});

    const addStones = (stoneArray, color) => {
      setStonesPlay((prevStonesPlay) => {
        const newStones = { ...prevStonesPlay };
        stoneArray.forEach((stone) => {
          const keyLetter = stone[0].toUpperCase();
          const keyNumber = stone[1];
          const keyNumberConvert = letterPositions[keyNumber] + 1;
          const position = `${keyLetter}${keyNumberConvert}`;
          newStones[position] = color;
        });
        return newStones;
      });
    };

    addStones(problemsRef.current.AB, 'black');
    addStones(problemsRef.current.AW, 'white');

    // Extrait et affiche la solution du problème
    const [solBlack, solPosition, solStatus] = problemsRef.current.SOL[0];
    const keyLetter = solPosition[0].toUpperCase();
    const keyNumber = solPosition[1];
    const keyNumberConvert = letterPositions[keyNumber] + 1;
    const position = `${keyLetter}${keyNumberConvert}`;
    setSolution(position); // "ba" dans ce cas
    console.log(`Solution: ${position}`);
  }, []);

  // Fonction pour gérer le clic sur une intersection
  const handleIntersectionClick = (intersection) => {
    setStonesPlay((prevStonesPlay) => {
      const newStonesPlay = { ...prevStonesPlay };
      newStonesPlay[intersection] = nextPlayer;
      return newStonesPlay;
    });

    // Vérification de la solution
    if (intersection === solution) {
      setSuccessMessage('Réussi, félicitations !');
    } else {
        setSuccessMessage('Mauvais coup, essayez encore.');
      
        setTimeout(() => {
            setSuccessMessage(''); // Efface le message après 2 secondes
          }, 2000);

        redirect('/');
    }

    // Alternance entre 'black' et 'white' pour le prochain joueur
    setNextPlayer((prevNextPlayer) => (prevNextPlayer === 'black' ? 'white' : 'black'));
  };

  return (
    <div className="goban-container">

        <div className='response-result'>
            {successMessage && <p>{successMessage}</p>} {/* Affichage du message de succès ou d'erreur */}
        </div>
      {/* Affichage de la solution */}
      <div className="solution-container">
        <p>Solution: {solution}</p>
        
      </div>

      {/* Plateau initial */}
      {/* <ReactGoban
        size="19"
        theme="classic"
        stones={initialStones}
        nextToPlay="black"
        onIntersectionClick={(intersection) => console.log('Intersection clicked:', intersection)}
      /> */}

      {/* Plateau pour jouer */}
      <ReactGoban
        size="19"
        theme="classic"
        stones={stonesPlay}
        nextToPlay={nextPlayer}
        onIntersectionClick={handleIntersectionClick}
      />
    </div>
  );
};

export default Goban;
