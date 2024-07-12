import { adminInstance } from "./axiosInstance";

/**
 * Crée un nouveau tsumego en envoyant une requête POST à l'API.
 *
 * @async
 * @function createTsumego
 * @param {Object} data - Les données du tsumego à créer.
 * @param {string} data.problem_desc - La description du problème du tsumego.
 * @param {string} data.description - La description du tsumego.
 * @param {string} data.difficulty - Le niveau de difficulté du tsumego.
 * @param {number} data.submitter - L'identifiant de l'utilisateur qui soumet le tsumego.
 * @returns {Promise<Object>} La réponse de l'API après la création du tsumego.
 * @throws {Error} Si la requête échoue, une erreur est renvoyée.
 */
export async function createTsumego(data) {
   const response = await adminInstance.post("tsumegos-create/", data);
   return response;
}
