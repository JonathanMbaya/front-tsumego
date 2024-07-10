import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProblemView() {
  const [tsumegos, setTsumegos] = useState([]);

  useEffect(() => {
    const fetchTsumegos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tsumegos/');
        if (Array.isArray(response.data.results)) {
          setTsumegos(response.data.results);  // Assurez-vous que response.data contient la liste des problèmes
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the tsumego list!', error);
      }
    };

    fetchTsumegos();
  }, [tsumegos]);

  return (
    <>
      <h1>Problèmes</h1>  

      <table>
        <thead>
          <tr>
            <th>Pseudo</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Niveau</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {tsumegos.map((tsumego) => (
            <tr key={tsumego.id}>
              <td>{tsumego.submitter}</td>
              <td>{tsumego.description}</td>
              <td>
                <select name="statut" id="statut" defaultValue={tsumego.status}>
                  <option value="false">En attente</option>
                  <option value="true">Publié</option>
                </select>
              </td>
              <td>{tsumego.problem_desc.difficulty}</td>

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
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProblemView;
