import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'animate.css';

function ListTsumego() {
    const [listTsumego, setListTsumego] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTsumegos = async () => {
        setShowLoading(true); // Affiche le message de chargement immédiatement

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/tsumegos/?page=${page}`);
            if (response.data && Array.isArray(response.data.results)) {
            setListTsumego(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
            setShowLoading(false);
            } else {
            console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('There was an error fetching the tsumego list!', error);
        } 
        };

        fetchTsumegos();
    }, [page]);

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

    const handlePreviousPage = () => {
        if (page > 1) {
        setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
        setPage(page + 1);
        }
    };


  return (
    <>
        <h1>Jouer au Tsumego</h1>
        <p style={{ textAlign: 'center' }}>Résoudre tous les niveaux</p>
        <h2>C'est parti !</h2>
        {showLoading && <p className='loading-page'>Chargement...</p>}
        <div className='pagination-info'>
            <span> {page} sur {totalPages}</span>
        </div>

        <div className='pagination'>
            <button className='prevGame' onClick={handlePreviousPage} disabled={page === 1}>
                <span class="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </button>
            
            <button className='nextGame' onClick={handleNextPage} disabled={page === totalPages}>
                <span class="material-symbols-outlined">
                    arrow_forward_ios
                </span>
            </button>
        </div>

        <div className='game animate__animated animate__fadeInUp'>
            {listTsumego.map((tsumego) => (
            <Link key={tsumego.id} to={`/listgames/game/${tsumego.id}`}>
                <div className='game-item'>
                    <p>Niveau {tsumego.id} </p>
                    <p>{getDifficultyLabel(tsumego.problem_desc.difficulty)}</p>
                    <span className="material-symbols-outlined">
                        check_small
                    </span>
                </div>
            </Link>
            ))}
        </div>
    </>
  );
}

export default ListTsumego;
