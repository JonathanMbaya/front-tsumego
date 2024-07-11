import React, { useEffect } from 'react'
import { getUser } from '../../../services/session/session'
import { useLocation, useNavigate } from 'react-router-dom'
import TsumegoForm from '../../../components/TsumegoForm/TsumegoForm'

/**
 * Le composant ProposeTusmegoView affiche le formulaire pour proposer un nouveau tsumego.
 * Si l'utilisateur n'est pas authentifié, il le redirige vers la page de connexion,
 * en conservant l'emplacement actuel pour revenir après une connexion réussie.
 */
const ProposeTusmegoView = () => {
  const user = getUser(); // Fonction pour obtenir le statut d'authentification de l'utilisateur
  const navigate = useNavigate(); // Hook de React Router pour la navigation
  const location = useLocation(); // Hook de React Router pour obtenir l'emplacement actuel

  useEffect(() => {
    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    if (!user) {
      navigate("/login", { state: { from: location.pathname } }); // Conserve l'emplacement actuel pour redirection après connexion
    }
  }, []); // Le tableau de dépendances vide assure que useEffect s'exécute une seule fois 

  return (
    <div className='container'>
      <TsumegoForm /> {/* Affiche le composant TsumegoForm pour proposer un nouveau tsumego */}
    </div>
  );
};


export default ProposeTusmegoView