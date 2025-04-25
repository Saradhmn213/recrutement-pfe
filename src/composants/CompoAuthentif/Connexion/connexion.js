import React, { useState } from 'react';
import './connexion.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Inscription from '../Inscription/inscription';
import MdpOublie from '../MdpOublier/mdpoublie'; // Import the ForgotPassword component

function Connexion({ isOpen, onClose }) {
  const [ setActiveView] = useState('login');
  const [showRegistrationPage, setShowRegistrationPage] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); // State to track forgot password view
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  if (!isOpen && !showRegistrationPage && !showForgotPassword) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "L'email est obligatoire";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
    
    if (!formData.password.trim()) {
      errors.password = "Le mot de passe est obligatoire";
    }
    
    return errors;
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Handle login form submission logic here
    console.log('Login form submitted', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showLoginView = () => {
    setActiveView('login');
    setShowRegistrationPage(false);
    setShowForgotPassword(false);
  };

  const handleShowRegistration = () => {
    setShowRegistrationPage(true);
  };

  const handleShowForgotPassword = () => {
    setShowForgotPassword(true);
  };

  // If forgot password page is active, show it instead of modal
  if (showForgotPassword) {
    return <MdpOublie onClose={showLoginView} />;
  }

  // If registration page is active, show it instead of modal
  if (showRegistrationPage) {
    return <Inscription onClose={showLoginView} />;
  }

  // Otherwise show the login modal
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}></button>
        
        <h2>Connexion</h2>
        <p className="required-field-note">Les champs marqués d'un astérisque (*) sont obligatoires</p>
        
        <form onSubmit={handleSubmitLogin}>
          <div className={`input-group ${formErrors.email ? 'error' : ''}`}>
            <FaEnvelope className="icon" />
            <input 
              type="email" 
              name="email"
              placeholder=" " 
              value={formData.email}
              onChange={handleChange}
            />
            <label className="float-label">E-mail *</label>
          </div>
          {formErrors.email && <div className="error-message">{formErrors.email}</div>}
          
          <div className={`input-group ${formErrors.password ? 'error' : ''}`}>
            <FaLock className="icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
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
          <button type="submit" className="btn-connexion">Connexion</button>
        </form>
        
        <div className="forgot-password">
          <button onClick={handleShowForgotPassword} className="btn-text">Mot de passe oublié ?</button>
        </div>
        
        <div className="registration-link">
          <p>Vous n'avez pas de compte ?</p>
          <button onClick={handleShowRegistration} className="btn-inscription">Inscription</button>
        </div>
      </div>
    </div>
  );
}

export default Connexion;