import axios from 'axios'; 
import React, { useEffect, useState } from 'react'; 
import Pagination from '../../../components/Pagination/Pagination'; 

function ListPlayerView() {
    const [players, setPlayers] = useState([]); // État pour stocker la liste des joueurs

    const [page, setPage] = useState(1); // État pour gérer la page actuelle des joueurs
    const [totalPages, setTotalPages] = useState(1); // État pour stocker le nombre total de pages
    const [totalCount, setTotalCount] = useState(0); // État pour stocker le nombre total de joueurs

    useEffect(() => {
        // Fonction pour récupérer la liste des joueurs depuis l'API
        const fetchPlayers = async () => {
            try {
                // Appel à l'API pour obtenir les données des joueurs
                const response = await axios.get('http://127.0.0.1:8000/api/users/');

                // Vérification de la structure de la réponse
                if (Array.isArray(response.data.results)) {
                    setPlayers(response.data.results); // Mise à jour de la liste des joueurs
                    setTotalPages(Math.ceil(response.data.count / response.data.results.length)); // Calcul du nombre total de pages
                    setTotalCount(response.data.count); // Mise à jour du nombre total de joueurs
                } else {
                    console.error('Structure de réponse inattendue :', response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération de la liste des joueurs :', error);
            }
        };

        fetchPlayers(); // Appel initial pour charger les joueurs lors du montage du composant
    }, []); // Dépendance vide pour que useEffect s'exécute une seule fois lors du montage du composant

    // Fonction pour gérer le changement de page des joueurs
    const handlePageChange = (newPage) => {
        setPage(newPage); // Mettre à jour l'état 'page' avec la nouvelle page sélectionnée
    };

    return (
        <>
            <h1>Liste de joueurs</h1>

            <table>
                <thead>
                    <tr>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(players) && players.length > 0 ? (
                        players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.username}</td>
                                <td>{player.email}</td>
                                <td>
                                    <select name="role" id={`role_${player.id}`} defaultValue={player.role_id}>
                                        <option value="false">Joueur</option>
                                        <option value="true">Editeur</option>
                                        <option value="true">Administrateur</option>
                                    </select>
                                </td>
                                <td>
                                    <span className="material-symbols-outlined">
                                        edit
                                    </span>
                                </td>
                                <td>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">Aucun joueur disponible</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Composant Pagination pour la navigation entre les pages */}
            <Pagination
                currentPage={page}
                totalCount={totalCount}
                pageSize={10} // Taille de la page, supposée être 10 éléments par page
                onPageChange={handlePageChange}
            />
        </>
    );
}

export default ListPlayerView;
