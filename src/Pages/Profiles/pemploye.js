import React from 'react';
import './profil.css'; 

export default function ProfileCandidate({ user }) {
  return (
    <div className="profile-container glass-card floating">
      <h2 className="neon-text">Profil Candidat</h2>
      <div className="profile-section">
        <div className="form-group">
          <label>CV :</label>
          <a href={user.cv} className="file-link hover-glow" target="_blank" rel="noopener noreferrer">
            Télécharger CV
          </a>
        </div>
        <div className="form-group">
          <label>Compétences :</label>
          <input type="text" value={user.skills} readOnly />
        </div>
        {/* Tu peux ajouter d'autres champs ici */}
      </div>
    </div>
  );
}
