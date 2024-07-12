import React, { useState } from 'react';
import './SearchBar.css';

/**
 * Composant SearchBar pour la recherche avec des critères spécifiques.
 * @component
 * @returns {JSX.Element} Élément JSX du composant SearchBar.
 */
function SearchBar() {
    // État local pour la requête de recherche
    const [searchQuery, setSearchQuery] = useState('Recherche...');
    // État local pour le critère de recherche
    const [searchBy, setSearchBy] = useState('playerName');

    /**
     * Gère le changement de la requête de recherche.
     * @param {Object} e - L'événement déclenché par la modification de l'entrée de recherche.
     */
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    /**
     * Gère le changement du critère de recherche.
     * @param {Object} e - L'événement déclenché par la sélection d'un critère de recherche.
     */
    const handleSearchByChange = (e) => {
        setSearchBy(e.target.value);
    };

    return (
        <div className="area-search">
            <div className="search-game">
                <input
                    type="search"
                    placeholder="Tapez votre recherche"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <span className="material-symbols-outlined">
                    search
                </span>
            </div>

            <div className="search-by-select" value={searchBy} onChange={handleSearchByChange}>
                <div className='btn-select' value="playerName">Par nom de joueur</div>
                <div className='btn-select' value="year">Par année</div>
                <div className='btn-select' value="openingFrequency">Par fréquence d'ouverture</div>
            </div>
        </div>
    );
}

export default SearchBar;
