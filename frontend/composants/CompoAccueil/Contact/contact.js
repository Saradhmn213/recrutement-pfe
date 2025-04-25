import React, { useState, useEffect } from 'react';
import './contact.css';
import { FaEnvelope, FaUser, FaCommentAlt, FaLocationArrow, FaPhone,  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Contact({ darkMode }) {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  // Déclencher les animations au chargement initial
  useEffect(() => {
    setTimeout(() => {
      setAnimateItems(true);
    }, 500);
  }, []);

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
    
    // Réinitialiser l'état des animations lorsqu'on retourne aux coordonnées
    if (!showContactInfo) {
      setTimeout(() => {
        setAnimateItems(true);
      }, 800);
    } else {
      setAnimateItems(false);
    }
  };

  return (
    <div className={`contact-dynamique-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`contact-slider ${showContactInfo ? 'slide-active' : ''}`}>
        {/* Face avant - Formulaire */}
        <div className="contact-side form-side">
          <div className="form-header">
            <h1>Besoin d'aide pour votre recrutement ? Envoyez-nous un message</h1>
            <p className="required-field-note">Les champs marqués d'un astérisque (*) sont obligatoires</p>
          </div>
          
          <form className="contact-form">
            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" id="name" name="name" placeholder=" " required />
              <label className="float-label">Nom *</label>
            </div>
            
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" id="email" name="email" placeholder=" " required />
              <label className="float-label">Email *</label>
            </div>
            
            <div className="input-group textarea-group">
              <FaCommentAlt className="icon" />
              <textarea id="message" name="message" placeholder=" " required></textarea>
              <label className="float-label">Comment pouvons-nous vous aider ? *</label>
            </div>
            
            <div className="button-container">
              <button type="submit" className="btn-envoyer">
                Envoyer
              </button>
            </div>
          </form>
          
          <button className="toggle-btn coordinates-btn" onClick={toggleContactInfo}>
            <span>Nos coordonnées</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        
        {/* Face arrière - Infos de contact */}
        <div className="contact-side info-side">
          <div className="info-header">
            <h3>EasyJob</h3>
            <p>Plateforme de recrutement en ligne</p>
          </div>
          
          <div className="contact-details">
            <div className={`contact-item ${animateItems ? 'animate-item-1' : ''}`}>
              <div className="contact-icon floating">
                <FaLocationArrow />
              </div>
              <div className="contact-text">
                <h4>Adresse</h4>
                <p>123 Avenue du Recrutement<br />1500 Tizi-Ouzou, Algérie</p>
              </div>
            </div>
            
            <div className={`contact-item ${animateItems ? 'animate-item-1' : ''}`}>
              <div className="contact-icon floating">
                <FaPhone />
              </div>
              <div className="contact-text">
                <h4>Téléphone</h4>
                <p>+213 x xx xx xx xx</p>
              </div>
            </div>
            
            <div className={`contact-item ${animateItems ? 'animate-item-1' : ''}`}>
              <div className="contact-icon floating">
                <FaEnvelope />
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <p>contact@easyjob.dz</p>
              </div>
            </div>
          </div>
          
          <div className={`social-media ${animateItems ? 'animate-item-4' : ''}`}>
            <h4>Suivez-nous</h4>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon linkedin">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-icon instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <button className="toggle-btn coordinates-btn" onClick={toggleContactInfo}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Formulaire</span>
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;