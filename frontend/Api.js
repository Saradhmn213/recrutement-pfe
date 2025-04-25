import axios from 'axios';

const API_URL = 'http://localhost:5000';

/**
 * Récupère la liste des offres.
 * @returns {Promise<Array>} Tableau des offres ou tableau vide en cas d'erreur
 */
export const getOffres = async () => {
  try {
    const response = await axios.get(`${API_URL}/offres`);
    const data = response.data;
    // Si l'API renvoie { offres: [...] }, on retourne ce tableau ; sinon on retourne directement le tableau reçu
    return Array.isArray(data) ? data : data.offres || [];
  } catch (error) {
    console.error('Erreur de récupération des offres', error);
    return [];
  }
};

/**
 * Récupère une offre par son ID.
 * @param {string} id - Identifiant de l'offre
 * @returns {Promise<Object|null>} Offre ou null si introuvable / erreur
 */
export const getOffreById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/offres/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur de récupération de l'offre ${id}`, error);
    return null;
  }
};

/**
 * Ajoute une nouvelle offre.
 * @param {Object} offre - Objet offre à créer
 * @returns {Promise<Object>} Offre créée
 */
export const ajouterOffre = async (offre) => {
  try {
    const response = await axios.post(`${API_URL}/offres`, offre);
    return response.data;
  } catch (error) {
    console.error("Erreur d'ajout d'offre", error);
    throw error;
  }
};
