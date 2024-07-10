import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../../components/Pagination/Pagination';

function ProblemView() {
  const [tsumegos, setTsumegos] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTsumegos = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tsumegos/?page=${page}`);
        if (Array.isArray(response.data.results)) {
          setTsumegos(response.data.results);  // Assurez-vous que response.data contient la liste des problèmes
          setTotalPages(Math.ceil(response.data.count/response.data.results.length));
          setTotalCount(response.data.count);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('There was an error fetching the tsumego list!', error);
      }
    };

    fetchTsumegos();
  }, [tsumegos]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
              {/* <td>{getSubmitter(tsumego.submitter)}</td> */}
              <td>{tsumego.submitter='NULL' ? 'Anonymous': tsumego.submitter}</td>
              <td>{tsumego.description = 'NULL' ? 'Aucune description' : tsumego.description}</td>
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

      <Pagination
        currentPage={page}
        totalCount={totalCount}
        pageSize={10}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default ProblemView;
