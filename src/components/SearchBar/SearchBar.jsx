import React,{useState} from 'react';
import './SearchBar.css';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('Recherche...');
    const [searchBy, setSearchBy] = useState('playerName');
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
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
                <span class="material-symbols-outlined">
                    search
                </span>
            </div>


            <div className="search-by-select" value={searchBy} onChange={handleSearchByChange}>
                <div className='btn-select' value="playerName">Par nom de joueur</div>
                <div className='btn-select' value="year">Par année</div>
                <div className='btn-select' value="openingFrequency">Par fréquence d'ouverture</div>
            </div>
        </div>

    )
}

export default SearchBar;
