import React, { useState } from 'react';
import { Goban as ReactGoban }  from 'react-goban';
import './FormProblem.css';

function FormProblem() {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  // État pour enregistrer les pierres placées
  const [registeredStones, setRegisteredStones] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre le formulaire
    console.log('Email:', email);
    console.log('Description:', description);
    // Réinitialiser le formulaire après l'envoi
    setEmail('');
    setDescription('');
  };

  // Fonction pour gérer le clic sur une intersection
  const handleIntersectionClick = (intersection) => {
    setRegisteredStones((prevStones) => {
      const newStones = { ...prevStones };
      newStones[intersection] = 'black'; // Exemple pour ajouter une pierre noire
      return newStones;
    }
  );
  }
  return (
    <div className="form-container">
      <h1>Soumettre le problème</h1>

      <ReactGoban
        size="19"
        theme="classic"
        stones={registeredStones}
        nextToPlay="black"
        onIntersectionClick={handleIntersectionClick}
      />

      <form onSubmit={handleSubmit}>
        <div className='item-form'>
            
          <label htmlFor="email">Votre Email</label>

          <input
          type="email"
          placeholder="Votre email"
          className="input-email"
          value={email}
          onChange={handleEmailChange}
          required
          />

        </div>

        <div className='item-form'>

          <label htmlFor="description">Décrivez votre problème</label>

          <textarea
          placeholder="Décrivez votre problème en quelques mots"
          className="input-description"
          value={description}
          onChange={handleDescriptionChange}
          required
          />

        </div>


        <input type="submit" value="Envoyer" className="input-submit" />
      </form>
    </div>
  );
}

export default FormProblem;
