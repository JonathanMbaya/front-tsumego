import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Goban as ReactGoban } from 'react-goban';
import axios from 'axios';
import 'animate.css';
import Pagination from '../components/Pagination/Pagination';
import { positionBoard } from '../utils/TreatmentData';

/**
 * Le composant ListTsumego affiche une liste de tsumegos paginée,
 * permet aux utilisateurs de naviguer entre les pages et de voir les détails de chaque tsumego.
 * @component
 * @returns {JSX.Element} Le rendu du composant ListTsumego.
 */
function ListTsumego() {
    // États pour gérer la liste de tsumegos, le chargement, la pagination et le nombre total de pages
    const [listTsumego, setListTsumego] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    // Effet pour charger les tsumegos depuis l'API en fonction de la page courante
    useEffect(() => {
        const fetchTsumegos = async () => {
            setShowLoading(true); // Afficher l'indicateur de chargement

            try {
                // Appel à l'API pour récupérer les données des tsumegos selon la page spécifiée
                const response = await axios.get(`http://127.0.0.1:8000/api/tsumegos/?page=${page}`);

                // Vérifier si la structure de la réponse est comme attendue
                if (response.data && Array.isArray(response.data.results)) {
                    const currentTsumegos = response.data.results; // Données des tsumegos pour la page courante
                    setListTsumego(currentTsumegos); // Mettre à jour la liste des tsumegos
                    setTotalPages(Math.ceil(response.data.count / 10)); // Calculer le nombre total de pages
                    setTotalCount(response.data.count); // Mettre à jour le nombre total de tsumegos

                    setShowLoading(false); // Cacher l'indicateur de chargement une fois terminé
                } else {
                    console.error('Structure de réponse inattendue :', response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la liste de tsumegos :', error);
            }
        };

        fetchTsumegos(); // Appel initial pour charger les tsumegos lors du montage ou lorsque 'page' change
    }, [page]); // Dépendance à 'page' pour que useEffect s'exécute à chaque changement de page

    /**
     * Fonction pour obtenir le label de difficulté correspondant à un niveau donné
     * @param {string} difficulty - Le niveau de difficulté (BEG, INT, ADV)
     * @returns {string} Le label de difficulté correspondant
     */
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

    /**
     * Fonction pour gérer le changement de page
     * @param {number} newPage - Le nouveau numéro de page
     */
    const handlePageChange = (newPage) => {
        setPage(newPage); // Mettre à jour l'état 'page' avec la nouvelle page sélectionnée
    };

    return (
        <div className="container">
            <h1>Jouer au Tsumego</h1>
            <p style={{ textAlign: 'center' }}>Résoudre tous les niveaux</p>

            {/* Affichage de l'indicateur de chargement si showLoading est vrai */}
            {showLoading && <p className='loading-page'>Chargement...</p>}

            <div className='game animate__animated animate__fadeInUp'>
                {/* Mapping sur la liste des tsumegos pour afficher chaque élément */}
                {listTsumego.map((tsumego) => (
                    <Link key={tsumego.id} to={`/listgames/game/${tsumego.id}`} className="mb-3">
                        <div className='game-item pb-4'>
                            {/* Utilisation de ReactGoban pour afficher le tableau de jeu */}
                            <div className='backImage'>
                                <ReactGoban
                                    size="19"
                                    theme="classic"
                                    stones={positionBoard(tsumego.problem_desc.AB, tsumego.problem_desc.AW)}
                                    nextToPlay="black"
                                />
                            </div>
                            <p>{getDifficultyLabel(tsumego.difficulty)}</p> {/* Affichage du label de difficulté */}
                            <span className="material-symbols-outlined">
                                check_small {/* Placeholder pour une icône */}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Composant Pagination pour la navigation entre les pages */}
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
