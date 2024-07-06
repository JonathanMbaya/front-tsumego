import React, { useState } from 'react';
import './FormProblem.css';

function FormProblem() {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

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

  return (
    <div className="form-container">
      <h1>Soumettre le problème</h1>
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
