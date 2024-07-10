import axios from 'axios';
import React, { useEffect, useState } from 'react';

function ListPlayerView() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        if (Array.isArray(response.data)) {
          setPlayers(response.data);  // Assurez-vous que response.data contient la liste des joueurs
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the player list!', error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <>
      <h1>Liste de joueurs</h1>
      <table>
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(players) ? (
            players.map((player) => (
              <tr key={player.id}>
                <td>{player.username}</td>
                <td>{player.email}</td>
                <td>********</td>
                <td>{player.role_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No players available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ListPlayerView;
