import React from 'react';
import './profil.css';

export default function ProfileRecruiter({ user }) {
  return (
    <div className="profile-container glass-card floating">
      <h2 className="neon-text">Profil Recruteur</h2>
      <div className="profile-section">
        <div className="form-group">
          <label>Nom entreprise :</label>
          <input type="text" value={user.company} readOnly />
        </div>
        <div className="form-group">
          <label>SIRET :</label>
          <input type="text" value={user.siret} readOnly />
        </div>
        {/* Tu peux ajouter d'autres champs ici */}
      </div>
    </div>
    
  );

  
}
