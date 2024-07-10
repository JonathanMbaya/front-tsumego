import React, { useState, useEffect } from 'react';
import { Goban as ReactGoban } from 'react-goban';
import axios from 'axios';
import './Goban.css';
import { positionBoard, solutionData } from '../../utils/TreatmentData';
import { useParams } from 'react-router-dom';

function BoardGoban() {
  // État local pour les positions des pierres
  const [stonesPlay, setStonesPlay] = useState({});
  const [gameData, setGameData] = useState(null);
  // État local pour afficher la solution
  const [solution, setSolution] = useState([]);
  // État local pour afficher le message de succès
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams(); // Extraction de l'id du problème via les paramètres de l'URL
  const [reveal , setReveal] = useState('true')

  useEffect(() => {
    // Fonction asynchrone pour récupérer les données du problème
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tsumegos/${id}`);
        const data = response.data;

        setGameData(data);

        // Préparation des données du problème
        const initialStones = positionBoard(data.problem_desc.AB, data.problem_desc.AW);
        setStonesPlay(initialStones);

        const answers = solutionData(data.problem_desc.SOL);
        setSolution(answers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]); // Dépendance sur id, pour que le fetch se produise à chaque changement de l'id

  // Fonction pour gérer le clic sur une intersection
  const handleIntersectionClick = (intersection) => {
    setStonesPlay((prevStonesPlay) => {
      const newStonesPlay = { ...prevStonesPlay };
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

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
    case 'BEG':
        return 'Débutant';
    case 'INT':
        return 'Intermédiaire';
    case 'ADV':
        return 'Avancé';
    default:
        return 'Inconnu';
    }
  };

  const toggleReveal = () => {
    setReveal((prevReveal) => !prevReveal);
  };


  return (
    <div className="goban-container">
      {gameData && (
        <>
          <div className='info-goban'>
            <h1>Trouvez la solution en un seul coup</h1>
              <h2 style={{ marginTop: '2rem' }}>A toi de jouer !</h2>

              <div style={{ textAlign: 'center' }}>
                <p>Niveau : {getDifficultyLabel(gameData.problem_desc.difficulty)}</p>

                {successMessage && <p className='response-result'>{successMessage}</p>}


                {/* Affichage de la solution */}
                <div className="solution-container">

                  <button className='btn-reveal' onClick={toggleReveal}>
                    {!reveal ? 'Cacher la solution' : 'Voir la solution'}
                  </button>

                  {!reveal && <p className='reveal'>{solution.join(', ')}</p>}

                </div>
              </div>


          </div>

            


          {/* Plateau pour jouer */}
          <ReactGoban
            size={gameData.problem_desc.SZ}
            theme="classic"
            stones={stonesPlay}
            nextToPlay="black"
            onIntersectionClick={handleIntersectionClick}
          />
        </>



      )}

    </div>
  );
}

export default BoardGoban;
