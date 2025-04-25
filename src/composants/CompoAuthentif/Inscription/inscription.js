import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaIndustry, FaArrowLeft, FaUndo, FaEye, FaEyeSlash, FaFileUpload } from "react-icons/fa";
import "./inscription.css";

const Inscription = ({ onClose }) => {
  const [role, setRole] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    // Désactive le scroll du body quand la modale est ouverte
    document.body.style.overflow = "hidden";
    return () => {
      // Restaure le scroll quand la modale se ferme
      document.body.style.overflow = "auto";
    };
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    prenom: "",
    email: "",
    password: "",
    type: "",
    sector: "",
    termsAccepted: false,
    cv: null // Ajout du CV
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false); // État pour afficher/masquer la modale des conditions

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
    setFormData({ 
      name: "", 
      prenom: "", 
      email: "", 
      password: "", 
      type: "", 
      sector: "", 
      termsAccepted: false,
      cv: null // Reset du CV 
    });
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  // Fonction pour gérer l'upload de fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, cv: file });
    
    // Si une erreur existait pour le CV, on la supprime
    if (formErrors.cv) {
      setFormErrors({
        ...formErrors,
        cv: ""
      });
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: "", 
      prenom: "", 
      email: "", 
      password: "", 
      type: "", 
      sector: "", 
      termsAccepted: false,
      cv: null // Reset du CV
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Le nom est obligatoire";
    if (role === "employe" && !formData.prenom.trim()) errors.prenom = "Le prénom est obligatoire";
    if (!formData.email.trim()) {
      errors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
    if (!formData.password.trim()) {
      errors.password = "Le mot de passe est obligatoire";
    } else if (formData.password.length < 6) {
      errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (role === "recruteur") {
      if (!formData.type) errors.type = "Le type d'entreprise est obligatoire";
      if (!formData.sector) errors.sector = "Le secteur est obligatoire";
    }
    // Validation pour le CV
    if (role === "employe" && !formData.cv) {
      errors.cv = "Veuillez télécharger votre CV";
    }
    // Validation de l'acceptation des conditions
    if (!formData.termsAccepted) {
      errors.termsAccepted = "Vous devez accepter les conditions d'utilisation";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("Données envoyées :", formData);
    alert("Inscription réussie !");
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Fonctions pour gérer l'affichage des conditions d'utilisation
  const toggleTermsModal = (e) => {
    e.preventDefault();
    setShowTerms(!showTerms);
  };

  const closeTermsModal = () => {
    setShowTerms(false);
  };

  return (
    <div className="container fade-in">
      <button className="back-button" onClick={onClose}>
        <FaArrowLeft /> Retour à la connexion
      </button>

      {!role ? (
        <div className="role-selection">
          <h2>Choisissez votre rôle</h2>
          <div className="role-buttons">
            <button className="role-card" onClick={() => handleRoleSelection("employe")}>
              <img src="/images/Candidat.jpg" alt="Employé" />
              <p>Employé</p>
            </button>
            <button className="role-card" onClick={() => handleRoleSelection("recruteur")}>
              <img src="/images/Recruteur.jpg" alt="Recruteur" />
              <p>Recruteur</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="form-container fade-in">
          <h2>Inscription {role === "employe" ? "Employé" : "Recruteur"}</h2>
          <p className="required-field-note">Les champs marqués d'un astérisque (*) sont obligatoires</p>
          <form onSubmit={handleSubmit}>
            <div className={`input-group ${formErrors.name ? 'error' : ''}`}>
              <FaUser className="icon" />
              <input 
                type="text" 
                name="name" 
                id="name"
                placeholder=" " 
                value={formData.name} 
                onChange={handleChange} 
              />
              <label className="float-label">Nom *</label>
            </div>
            {formErrors.name && <div className="error-message">{formErrors.name}</div>}

            {role === "employe" && (
              <>
                <div className={`input-group ${formErrors.prenom ? 'error' : ''}`}>
                  <FaUser className="icon" />
                  <input 
                    type="text" 
                    name="prenom" 
                    id="prenom"
                    placeholder=" " 
                    value={formData.prenom} 
                    onChange={handleChange} 
                  />
                  <label className="float-label">Prénom *</label>
                </div>
                {formErrors.prenom && <div className="error-message">{formErrors.prenom}</div>}
                
        
              </>
            )}

            <div className={`input-group ${formErrors.email ? 'error' : ''}`}>
              <FaEnvelope className="icon" />
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder=" " 
                value={formData.email} 
                onChange={handleChange} 
              />
              <label className="float-label">Email *</label>
            </div>
            {formErrors.email && <div className="error-message">{formErrors.email}</div>}

            <div className={`input-group ${formErrors.password ? 'error' : ''}`}>
              <FaLock className="icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                id="password"
                placeholder=" " 
                value={formData.password} 
                onChange={handleChange} 
              />
              <label className="float-label">Mot de Passe *</label>
              <div className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {formErrors.password && <div className="error-message">{formErrors.password}</div>}
             {/* Ajout du champ pour uploader le CV */}
             {role === "employe" && (
               <div className={`file-upload-wrapper ${formErrors.cv ? 'error' : ''}`}>
                  <label className="custom-file-upload">
                    <input type="file" accept=".pdf" onChange={handleFileChange} />
                    <FaFileUpload className="upload-icon" />
                    <span className="upload-text">
                     {formData.cv ? formData.cv.name : "Cliquez pour ajouter votre CV (format PDF)*"}
                    </span>
                 </label>
                 {formErrors.cv && <div className="error-message">{formErrors.cv}</div>}
               </div>
              )}

            {role === "recruteur" && (
              <>
                <div className={`input-group ${formErrors.type ? 'error' : ''}`}>
                  <FaBuilding className="icon" />
                  <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Type d'entreprise *</option>
                    <option value="privé">Privé</option>
                    <option value="public">Public</option>
                  </select>
                </div>
                {formErrors.type && <div className="error-message">{formErrors.type}</div>}

                <div className={`input-group ${formErrors.sector ? 'error' : ''}`}>
                  <FaIndustry className="icon" />
                  <select name="sector" value={formData.sector} onChange={handleChange}>
                    <option value="">Sélectionnez un secteur *</option>
                    <option value="Informatique & IT">Informatique & IT</option>
                    <option value="Finance & Assurance">Finance & Assurance</option>
                    <option value="Santé & Pharmaceutique">Santé & Pharmaceutique</option>
                    <option value="Industrie & Ingénierie">Industrie & Ingénierie</option>
                    <option value="Commerce & Vente">Commerce & Vente</option>
                    <option value="Marketing & Communication">Marketing & Communication</option>
                    <option value="Éducation & Formation">Éducation & Formation</option>
                    <option value="Transport & Logistique">Transport & Logistique</option>
                    <option value="Hôtellerie & Restauration">Hôtellerie & Restauration</option>
                    <option value="Administration & Juridique">Administration & Juridique</option>
                  </select>
                </div>
                {formErrors.sector && <div className="error-message">{formErrors.sector}</div>}
              </>
            )}

            {/* Ajout de la case à cocher pour les conditions d'utilisation */}
            <div className={`terms-checkbox ${formErrors.termsAccepted ? 'error' : ''}`}>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                />
                <label htmlFor="termsAccepted">
                  J'accepte les <a href="/connexion" onClick={toggleTermsModal}>conditions d'utilisation</a> *
                </label>
              </div>
              {formErrors.termsAccepted && <div className="error-message">{formErrors.termsAccepted}</div>}
            </div>

            <div className="button-group">
              <button type="submit">S'inscrire</button>
              <button type="button" onClick={resetForm} className="reset-button">
                <FaUndo /> Réinitialiser
              </button>
            </div>
            <button type="button" onClick={() => setRole(null)} className="secondary-button">
              Changer de rôle
            </button>
          </form>
        </div>
      )}

      {/* Modal des conditions d'utilisation */}
      {showTerms && (
        <div className="terms-modal-overlay fade-in">
          <div className="terms-modal">
            <div className="terms-modal-header">
              <h3>Conditions d'utilisation</h3>
              <button className="close-modal" onClick={closeTermsModal}>×</button>
            </div>
            <div className="terms-modal-content">
              <h4>1. Introduction</h4>
              <p>Bienvenue sur notre plateforme de recrutement en ligne. En utilisant nos services, vous acceptez les présentes conditions d'utilisation.</p>
              
              <h4>2. Utilisation du service</h4>
              <p>Notre plateforme offre un service de mise en relation entre employeurs et candidats. Tous les utilisateurs s'engagent à fournir des informations exactes et à jour.</p>
              
              <h4>3. Protection des données</h4>
              <p>Nous accordons une importance particulière à la protection de vos données personnelles.</p>
              
              <h4>4. Responsabilités</h4>
              <p>Chaque utilisateur est responsable des informations qu'il partage sur la plateforme.</p>
            </div>
            <div className="terms-modal-footer">
              <button onClick={closeTermsModal} className="accept-terms-btn">
                J'ai compris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inscription;