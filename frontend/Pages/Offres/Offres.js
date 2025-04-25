import React, { useState } from 'react';
import './Offres.css';


const Offres = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
 
  
  // Exemple de données d'emplois (à remplacer par une API réelle)
  const jobsData = [
    {
      id: 1,
      logo: "/neuvoo-logo.png",
      title: "Chargé(e) de développement webmarketing / e-commerce (H/F)",
      location: "Alger",
      salary: "Selon profil",
      contract: "Contrat pro / Alternance",
      publicationDate: "21/11/2024"
    },
    {
      id: 2,
      logo: "/neuvoo-logo.png",
      title: "Partenaire Digital - Gestion des Services et Relation Client (H/F)",
      location: "Constantine",
      salary: "Selon profil",
      contract: "CDI",
      publicationDate: "18/11/2024"
    },
    {
      id: 3,
      logo: "/neuvoo-logo.png",
      title: "Chef de département E-commerce - Commerce alimentaire (H/F)",
      location: "Oran",
      salary: "Selon profil",
      contract: "CDI",
      publicationDate: "15/11/2024"
    },
    {
      id: 4,
      logo: "/neuvoo-logo.png",
      title: "Développeur Web Frontend (H/F)",
      location: "Annaba",
      salary: "45K-55K€",
      contract: "CDI",
      publicationDate: "14/11/2024"
    },
    {
      id: 5,
      logo: "/neuvoo-logo.png",
      title: "UX/UI Designer (H/F)",
      location: "Tlemcen",
      salary: "Selon profil",
      contract: "CDI",
      publicationDate: "12/11/2024"
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Simuler une recherche avec les données statiques
    const filteredResults = jobsData.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(filteredResults);
    setHasSearched(true);
  };

  // Liste des wilayas d'Algérie pour le filtre de localisation
  const wilayasAlgerie = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", 
    "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", 
    "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", 
    "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", 
    "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", 
    "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", 
    "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal", "Béni Abbès", 
    "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
  ];

  return (
    <div className={`job-search-wrapper ${darkMode ? "dark" : "light"}`}>
      {/* Section d'introduction intégrée */}
      <div className="nav-spacer"></div>
      <div className="intro-section">
        <h1>Découvrez les meilleures opportunités d'emploi</h1>
        <p>Des centaines d'offres proposées par des entreprises algériennes partenaires</p>
        <div className="logos-partners">
          <div className="logos-track">
            <img src="/img/cevital.png" alt="Cevital" />
            <img src="/img/sonatrach.png" alt="Sonatrach" />
            <img src="/img/ifri.png" alt="ifri" />
            <img src="/img/djezzy.png" alt="djezzy" />
            <img src="/img/algerietelecom.png" alt="algerie-telecom" />
            <img src="/img/condor.png" alt="condor" />
            <img src="/img/airalgerie.png" alt="airalgerie" />
            <img src="/img/soumam.png" alt="Soumam" />
            <img src="/img/Sonatrach.png" alt="Sonatrach" />
            <img src="/img/cevital.png" alt="Cevital" />
            <img src="/img/ifri.png" alt="ifri" />
            <img src="/img/djezzy.png" alt="djezzy" />
            <img src="/img/algerietelecom.png" alt="algerie-telecom" />
            <img src="/img/condor.png" alt="condor" />
            <img src="/img/sonatrach.png" alt="Sonatrach" />
            <img src="/img/airalgerie.png" alt="airalgerie" />
            <img src="/img/soumam.png" alt="Soumam" />
            <img src="/img/Sonatrach.png" alt="Sonatrach" />
          </div>
        </div>
      </div>
      
      
      <div className="search-form-container">
        <h2 className="search-heading">Rechercher un emploi</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              className="search-input"
              placeholder="Quel poste recherchez-vous ?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button type="submit" className="search-button">
              <span className="search-icon">⌕</span>
            </button>
          </div>
          
          <div className="filter-options">
            <div className="filter-option">
              <select className="filter-select">
                <option value="">Localisation</option>
                {wilayasAlgerie.map((wilaya, index) => (
                  <option key={index} value={wilaya.toLowerCase()}>{wilaya}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-option">
              <select className="filter-select">
                <option value="">Type de contrat</option>
                <option value="cdi">CDI</option>
                <option value="cdd">CDD</option>
                <option value="alternance">Alternance</option>
                <option value="stage">Stage</option>
              </select>
            </div>
            
            <div className="filter-option">
              <select className="filter-select">
                <option value="">Expérience</option>
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      
      {hasSearched && (
        <div className="search-results-container">
          <div className="results-header">
            <h3>Résultats de votre recherche : {searchResults.length} annonces correspondantes</h3>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="job-listings">
              {searchResults.map(job => (
                <div className="job-card" key={job.id}>
                  <div className="job-logo">
                    <img src={job.logo} alt="Logo entreprise" />
                  </div>
                  
                  <div className="job-details">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-info">
                      <div className="info-item">
                        <span className="info-label">Ville :</span>
                        <span className="info-value">{job.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Salaire :</span>
                        <span className="info-value">{job.salary}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Contrat :</span>
                        <span className="info-value">{job.contract}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Publication :</span>
                        <span className="info-value">{job.publicationDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="job-action">
                    <button className="view-job-btn">
                      Voir l'offre <span className="btn-icon">►</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>Aucune offre ne correspond à votre recherche. Veuillez essayer avec d'autres critères.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Offres;