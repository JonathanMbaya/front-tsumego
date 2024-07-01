// Goban.js

import React, { useState } from 'react';
import { Goban as ReactGoban } from 'react-goban';
import './Goban.css';

const Goban = () => {

  const initialStones = {
    "P16": "black",
    "Q4": "white",
    "D4": "black",
    "E16": "white"
  };

  const problems = {
    "AB": ["eb", "fb", "bc", "cc", "dc", "be"],
    "AW": ["da", "ab", "bb", "cb", "db"],
    "SZ": "19",
    "C": "Black to play: Elementary",
    "SOL": [["B", "ba", "Correct.", ""]]
  };

  // État local pour les positions des pierres
  const [stonesPlay, setStonesPlay] = useState();
  // État local pour la couleur du prochain joueur à jouer
  const [nextPlayer, setNextPlayer] = useState('black'); // Initialisation avec 'black'

  // Initialisation de la longueur de la clé
  let lengthInitBlack = 0;

  // Je récupère les longueurs des clés 
  const keyLengthBlack = problems.AB.length; 

  if (lengthInitBlack <= keyLengthBlack) {
    function processBlackStones(lengthInitBlack) {

      const  keyLetter = problems.AB[lengthInitBlack][0].toUpperCase();
      const keyNumber = problems.AB[lengthInitBlack] ? problems.AB[lengthInitBlack][1] : undefined;
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const letterPositions = letters.reduce((acc, letter, index) => {
        acc[letter] = index;
        return acc;
      }, {});

      const keyNumberConvert = letterPositions[keyNumber]+1;

      const positionBlack = {
        [keyLetter + keyNumberConvert] : "black",
      } ; 
      console.log(positionBlack);  // Affiche "eb", "fb", etc. à chaque appel 
      // Incrémentation
      lengthInitBlack += 1;

      setStonesPlay(positionBlack);

      // Si besoin de continuer la boucle, on peut rappeler la fonction ou utiliser une boucle
      if (lengthInitBlack < keyLengthBlack) {
        processBlackStones(lengthInitBlack);
      }
    }

    processBlackStones(lengthInitBlack);
  }



  // Initialisation de la longueur de la clé
  let lengthInitWhite = 0;
  // Je récupère les longueurs des clés
  const keyLengthWhite = problems.AW.length;

  if (lengthInitWhite <= keyLengthWhite) {

    function processWhiteStones(lengthInitWhite) {

      const  keyLetter = problems.AW[lengthInitWhite][0].toUpperCase();
      const keyNumber = problems.AB[lengthInitWhite] ? problems.AB[lengthInitWhite][1] : undefined;
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const letterPositions = letters.reduce((acc, letter, index) => {
        acc[letter] = index;
        return acc;
      }, {});

      const keyNumberConvert = letterPositions[keyNumber]+1;

      const positionWhite = {
        [keyLetter + keyNumberConvert] : "white"
      } ; 
      console.log(positionWhite);  // Affiche "eb", "fb", etc. à chaque appel 
      // Incrémentation
      lengthInitWhite += 1;

      setStonesPlay(positionWhite);
      // Si besoin de continuer la boucle, on peut rappeler la fonction ou utiliser une boucle
      if (lengthInitWhite < keyLengthBlack) {
        processWhiteStones(lengthInitWhite);
      }
    }

    processWhiteStones(lengthInitWhite);

  }



  // Fonction pour gérer le clic sur une intersection
  const handleIntersectionClick = (intersection) => {
    const newStonesPlay = { ...stonesPlay };

    // Toggle de la couleur de la pierre à l'intersection cliquée
    newStonesPlay[intersection] = nextPlayer;

    // Alternance entre 'black' et 'white' pour le prochain joueur
    const newNextPlayer = nextPlayer === 'black' ? 'white' : 'black';

    // Mettre à jour l'état avec les nouvelles positions des pierres et le prochain joueur
    setStonesPlay(newStonesPlay);
    setNextPlayer(newNextPlayer);
  };
  // console.log(initialStones);
  // console.log(stonesPlay);



  return (
    <div className="goban-container">
      {/* Plateau initial */}
      <ReactGoban
        size="19"
        theme="classic"
        stones={initialStones}
        nextToPlay="black"
        onIntersectionClick={(intersection) => console.log('Intersection clicked:', intersection)}
      />

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
