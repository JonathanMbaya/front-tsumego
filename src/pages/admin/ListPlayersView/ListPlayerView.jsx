import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';

function ListPlayerView() {
    const [players, setPlayers] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchPlayers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/');
            if (Array.isArray(response.data.results)) {
            setPlayers(response.data.results);  // Assurez-vous que response.data contient la liste des joueurs
            setTotalPages(Math.ceil(response.data.count/response.data.results.length));
            setTotalCount(response.data.count);
            } else {
            console.error('Unexpected response data:', response.data);
            }
        } catch (error) {
            console.error('There was an error fetching the player list!', error);
        }
        };

        fetchPlayers();
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
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
            {Array.isArray(players) ? (
                players.map((player) => (
                    <tr key={player.id}>
                        <td>{player.username}</td>
                        <td>{player.email}</td>
                        <td>
                            <select name="statut" id="statut" defaultValue={player.role_id}>
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
                <td colSpan="4">No players available</td>
                </tr>
            )}
            </tbody>
        </table>

        <Pagination
            currentPage={page}
            totalCount={totalCount}
            pageSize={10}
            onPageChange={handlePageChange}
        />
    </>
  );
}

export default ListPlayerView;
