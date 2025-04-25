// RecruiterSpace.jsx
import React, { useState } from 'react';
import './Recrut.css';

const RecruiterSpace = () => {
  const wilayas = ['Alger', 'Oran', 'Constantine', 'Annaba', 'Tizi Ouzou', 'Blida'];

  const [jobs, setJobs] = useState([
    { id: 1, title: 'Développeur Full Stack', location: 'Alger', applicants: 15, status: 'active' },
    { id: 2, title: 'Ingénieur Réseaux', location: 'Oran', applicants: 8, status: 'active' },
    { id: 3, title: 'Chef de Projet IT', location: 'Constantine', applicants: 23, status: 'closed' },
  ]);

  const [applications, setApplications] = useState([
    { id: 1, name: 'Karim Belkacem', position: 'Développeur Full Stack', status: 'À examiner' },
    { id: 2, name: 'Amine Zaid', position: 'Ingénieur Réseaux', status: 'Entretien prévu' },
    { id: 3, name: 'Leila Chennouf', position: 'Chef de Projet IT', status: 'Refusé' },
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    location: '',
    applicants: 0,
    status: 'active'
  });

  const [showForm, setShowForm] = useState(false);

  const handleAddJob = () => {
    if (newJob.title && newJob.location) {
      setJobs([...jobs, { ...newJob, id: jobs.length + 1 }]);
      setNewJob({ title: '', location: '', applicants: 0, status: 'active' });
      setShowForm(false);
    }
  };

  const activeJobCount = jobs.filter(job => job.status === 'active').length;
  const interviewCount = applications.filter(app => app.status.toLowerCase() === 'entretien prévu').length;

  return (
    <div className="recruiter-container">
      <header className="recruiter-header">
        <div className="header-content">
          <h1>Espace Recruteur <span className="algeria-flag">🇩🇿</span></h1>
          <div className="notifications">
            <span className="notification-badge">3</span>
            <i className="fas fa-bell"></i>
          </div>
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-briefcase"></i></div>
          <div className="stat-info">
            <h3>Offres Actives</h3>
            <p>{activeJobCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-users"></i></div>
          <div className="stat-info">
            <h3>Candidatures</h3>
            <p>{applications.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-calendar-check"></i></div>
          <div className="stat-info">
            <h3>Entretiens</h3>
            <p>{interviewCount}</p>
          </div>
        </div>
      </div>

      <section className="job-listings">
        <div className="section-header">
          <h2>Offres d'Emploi</h2>
          <button className="new-job-button" onClick={() => setShowForm(!showForm)}>
         
            <i className="fas fa-plus"></i> Nouvelle Offre
          </button>
        </div>

              
        {showForm && (
          <div className="fond-modal-offre">
            <div className="modale-nouvelle-offre">
            <button className="close-button" onClick={() => setShowForm(false)} aria-label="Fermer" > &times; </button>
              <h3>Créer une nouvelle offre</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddJob();
              }}>
                <div className="groupe-formulaire">
                  <label>Titre du poste *</label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                  />
                </div>

                <div className="groupe-formulaire">
                  <label>Wilaya *</label>
                  <select
                    required
                    value={newJob.location}
                    onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                  >
                    <option value="">Choisir une wilaya</option>
                    {wilayas.map(wilaya => (
                      <option key={wilaya} value={wilaya}>{wilaya}</option>
                    ))}
                  </select>
                </div>

        <div className="groupe-formulaire">
          <label>Type de contrat *</label>
          <select
            value={newJob.typeContrat || 'CDI'}
            onChange={(e) => setNewJob({...newJob, typeContrat: e.target.value})}
          >
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div className="groupe-formulaire">
          <label>Description *</label>
          <textarea
            required
            value={newJob.description || ''}
            onChange={(e) => setNewJob({...newJob, description: e.target.value})}
            rows="5"
          />
        </div>

        <div className="actions-formulaire">
          <button
            type="button"
            className="bouton-annuler"
            onClick={() => setShowForm(false)}
          >
            Annuler
          </button>
          <button type="submit" className="bouton-soumettre">
            Publier l'offre
          </button>
        </div>
      </form>
    </div>
  </div>
)}


     

        <div className="jobs-grid">
          {jobs.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-content">
                <h3>{job.title}</h3>
                <div className="job-meta">
                  <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>
                  <span><i className="fas fa-users"></i> {job.applicants} candidats</span>
                </div>
                <div className="job-footer">
                  <span className={`status ${job.status}`}>
                    {job.status === 'active' ? 'Active' : 'Clôturée'}
                  </span>
                  <button className="view-button">
                    Voir <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recent-applications">
        <h2>Candidatures Récentes</h2>
        <div className="applications-container">
          {applications.map(application => (
            <div key={application.id} className="application-card">
              <div className="candidate-info">
                <div className="candidate-avatar">
                  {application.name[0]}
                </div>
                <div>
                  <h4>{application.name}</h4>
                  <p>{application.position}</p>
                </div>
              </div>
              <div className={`application-status ${application.status.toLowerCase().replace(' ', '-')}`}>
                <i className="fas fa-circle"></i> {application.status}
              </div>
              <button className="action-button">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecruiterSpace;
