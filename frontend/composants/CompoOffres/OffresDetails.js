import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOffreById } from '../../Api'; // ← N'oublie pas d'ajouter ça

const OffreDetails = () => {
  const { id } = useParams();
  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffre = async () => {
      const data = await getOffreById(id);
      setOffre(data);
      setLoading(false);
    };
    fetchOffre();
  }, [id]);

  if (loading) return <p style={{ padding: '2rem' }}>Chargement en cours...</p>;
  if (!offre) return <p style={{ padding: '2rem' }}>Offre non trouvée.</p>;

  return (
    <div className="offre-details" style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
      <h1>{offre.titre}</h1>
      <p><strong>Description :</strong> {offre.description}</p>
      <p><strong>Secteur :</strong> {offre.secteur}</p>
      <p><strong>Type de contrat :</strong> {offre.contrat}</p>
      <p><strong>Localisation :</strong> {offre.localisation}</p>
      <p><strong>Détails :</strong> {offre.details}</p>
      <button style={{
        marginTop: '1rem',
        padding: '10px 20px',
        backgroundColor: '#68A48B',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer'
      }}>
        Postuler maintenant
      </button>
    </div>
  );
};

export default OffreDetails;
