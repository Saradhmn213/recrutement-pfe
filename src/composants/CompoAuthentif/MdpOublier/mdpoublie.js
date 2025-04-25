import React, { useState } from "react";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa";
import "./mdpoublie.css";

const MdpOublie = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Un lien de réinitialisation a été envoyé !");
    // Optionally return to login screen after successful submission
    // onClose();
  };

  return (
    <div className="container fade-in">
      <button className="back-button" onClick={onClose}>
        <FaArrowLeft /> Retour à la connexion
      </button>

      <div className="form-container fade-in">
        <h2>Mot de passe oublié</h2>
        <p>Entrez votre email pour réinitialiser votre mot de passe</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="float-label">Votre e-mail</label>
          </div>
          <button type="submit">Envoyer le lien de réinitialisation</button>
        </form>
      </div>
    </div>
  );
};

export default MdpOublie;