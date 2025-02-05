import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from '../../../components/Pagination/Pagination';

/**
 * Composant ProblemView
 * Affiche une liste de tsumegos (problèmes) avec pagination.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant ProblemView.
 */
function ProblemView() {
  const [tsumegos, setTsumegos] = useState([]); // État pour stocker la liste des tsumegos
  const [page, setPage] = useState(1); // État pour gérer la page actuelle
  const [totalPages, setTotalPages] = useState(1); // État pour stocker le nombre total de pages
  const [totalCount, setTotalCount] = useState(0); // État pour stocker le nombre total d'éléments

  useEffect(() => {
    /**
     * Effet pour charger les tsumegos depuis l'API en fonction de la page courante.
     * 
     * @function
     * @async
     */
    const fetchTsumegos = async () => {
      try {
        // Appel à l'API pour récupérer les données des tsumegos selon la page spécifiée
        const response = await axios.get(`http://127.0.0.1:8000/api/tsumegos/?page=${page}`);

        // Vérifier si la réponse contient un tableau de résultats
        if (Array.isArray(response.data.results)) {
          const currentTsumegos = response.data.results; // Récupération des tsumegos pour la page courante
          setTsumegos(currentTsumegos); // Mettre à jour la liste des tsumegos
          setTotalPages(Math.ceil(response.data.count / response.data.results.length)); // Calculer le nombre total de pages
          setTotalCount(response.data.count); // Mettre à jour le nombre total d'éléments
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
   * Fonction pour gérer le changement de page.
   * 
   * @function
   * @param {number} newPage - La nouvelle page sélectionnée.
   */
  const handlePageChange = (newPage) => {
    setPage(newPage); // Mettre à jour l'état 'page' avec la nouvelle page sélectionnée
  };

  return (
    <>
      <h1>Problèmes</h1>

      <table>
        <thead>
          <tr>
            <th>Nom</th>
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
              {/* Affichage des détails de chaque tsumego dans des cellules de tableau */}
              <td>{tsumego.submitter === 'NULL' ? 'Anonyme' : tsumego.submitter}</td>
              <td>{tsumego.description === 'NULL' ? 'Aucune description' : tsumego.description}</td>
              <td>
                {/* Sélectionneur de statut avec valeurs par défaut basées sur le statut actuel du tsumego */}
                <select name="statut" id="statut" defaultValue={tsumego.status}>
                  <option value="false">En attente</option>
                  <option value="true">Publié</option>
                </select>
              </td>
              <td>{tsumego.problem_desc.difficulty}</td>
              <td>
                {/* Icône pour modifier le tsumego */}
                <span className="material-symbols-outlined">
                  edit
                </span>
              </td>
              <td>
                {/* Icône pour supprimer le tsumego */}
                <span className="material-symbols-outlined">
                  delete
                </span>
              </td>
            </tr>
          ))}
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

export default ProblemView;
