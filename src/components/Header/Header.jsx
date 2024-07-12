import React from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import './Header.css';

/**
 * Composant Header pour afficher la barre de navigation en fonction de la page actuelle.
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.currentPage - La page actuelle.
 * @returns {JSX.Element} Élément JSX du composant Header.
 */
function Header({ currentPage }) {
    const location = useLocation();

    return (
        <div>
            {/* Affiche la barre de navigation sur la page d'accueil */}
            {location.pathname === '/' && 
                <Navbar />
            }

            {/* Affiche la barre de navigation sur la page de la liste des jeux */}
            {location.pathname === '/listgames' && 
                <Navbar />
            }

            {/* Affiche la barre de navigation sur les pages de détail des jeux */}
            {location.pathname.startsWith('/listgames/game') && (
                <Navbar />
            )}

            {/* Affiche la barre de navigation sur la page de soumission de problème */}
            {location.pathname === '/submit-problem' && 
                <Navbar />
            }
        </div>
    );
}

export default Header;
