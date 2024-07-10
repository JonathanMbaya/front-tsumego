import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Goban as ReactGoban } from 'react-goban';
import axios from 'axios';
import 'animate.css';
import Pagination from '../components/Pagination/Pagination';
import { positionBoard } from '../utils/TreatmentData';

function ListTsumego() {
    const [listTsumego, setListTsumego] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);


    useEffect(() => {
        const fetchTsumegos = async () => {
            setShowLoading(true);

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/tsumegos/?page=${page}`);
                if (response.data && Array.isArray(response.data.results)) {
                    // Update the list of tsumegos with the current page's data
                    const currentTsumegos = response.data.results;
                    setListTsumego(currentTsumegos);
                    setTotalPages(Math.ceil(response.data.count/10));
                    setTotalCount(response.data.count);


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

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="container">
            <h1>Jouer au Tsumego</h1>
            <p style={{ textAlign: 'center' }}>Résoudre tous les niveaux</p>


            {showLoading && <p className='loading-page'>Chargement...</p>}

            <div className='game animate__animated animate__fadeInUp'>
                {listTsumego.map((tsumego) => (
                    <Link key={tsumego.id} to={`/listgames/game/${tsumego.id}`} className="mb-3">
                        <div className='game-item pb-4'>
                            <div className='backImage'>
                                <ReactGoban
                                    size="19"
                                    theme="classic"
                                    stones={positionBoard(tsumego.problem_desc.AB, tsumego.problem_desc.AW)}
                                    nextToPlay="black"
                                />
                            </div>
                            <p>{getDifficultyLabel(tsumego.problem_desc.difficulty)}</p>
                            <span className="material-symbols-outlined">
                                check_small
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalCount={totalCount}
                pageSize={10}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ListTsumego;
