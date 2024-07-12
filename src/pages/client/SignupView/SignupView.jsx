import React, { useEffect } from 'react';
import UserForm from '../../../components/UserForm/UserForm';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../services/session/session';

/**
 * Le composant SignupView affiche le formulaire d'inscription.
 * Si un utilisateur est déjà authentifié, il le redirige vers la page d'accueil.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant SignupView.
 */
const SignupView = () => {
  const navigate = useNavigate(); // Hook de React Router pour la navigation
  const user = getUser(); // Fonction pour obtenir le statut d'authentification de l'utilisateur

  useEffect(() => {
    // Redirige vers la page d'accueil si l'utilisateur est déjà authentifié
    if (user) {
      navigate("/");
    }
  }, []); // Le tableau de dépendances vide assure que useEffect s'exécute une seule fois 

  return (
    <main className="container d-flex align-items-center pt-0">
      <UserForm /> {/* Affiche le composant UserForm pour l'inscription */}
    </main>
  );
};

export default SignupView;
