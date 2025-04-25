import React, { useState, useEffect } from 'react';
import './AproposDeNous.css';

function AproposDeNous() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-container">
      <section className="about-section" id="introduction">
        <div className="about-header">
          <h1>Introduction</h1>
          <div className="active-indicator"></div>
        </div>
        <div className="about-content">
          <div className="about-image">
            <img src="/img/aboutUs.jpg" alt="AboutUs" />
          </div>
          <div className="about-text">
            <div className="faq-title-container">
              <img src="/img/aboutUs2.png" alt="FAQ Icon" className="faq-icon-img" />
              <h2>FAQ :</h2>
              <div className="active-indicator"></div>
            </div>

            <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(0)}>
                <h3>Qu'est-ce que EasyJob?</h3>
                <span className="faq-icon">&#9660;</span>
              </div>
              <div className="faq-answer">
                <p>EasyJob est une plateforme de recrutement innovante qui connecte les candidats avec les meilleures opportunités d'emploi.</p>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(1)}>
                <h3>Quels services proposez-vous?</h3>
                <span className="faq-icon">&#9660;</span>
              </div>
              <div className="faq-answer">
                <p>Nous offrons une plateforme complète permettant aux candidats de postuler et aux recruteurs de publier leurs annonces.</p>
              </div>
            </div>

            <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFaq(2)}>
                <h3>Combien de recrutements réussis?</h3>
                <span className="faq-icon">&#9660;</span>
              </div>
              <div className="faq-answer">
                <p>Plus de 10 000 recrutements réussis depuis notre lancement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AproposDeNous;