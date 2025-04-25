import './Accueil.css';
import PhotoSlider from '../../composants/CompoAccueil/PhotoSlider/PhotoSlider';
import AproposDeNous from '../../composants/CompoAccueil/AproposDeNous/AproposDeNous';
import Contact from '../../composants/CompoAccueil/Contact/contact'; 



function Accueil() {
  
  console.log('PhotoSlider =', PhotoSlider);
  console.log('AproposDeNous =', AproposDeNous);
  console.log('Contact =', Contact);


  return (
    <div className="home-container">
      {/* Hero Section avec slider en arrière-plan */}
      <section className="hero-section">
        <PhotoSlider />
      </section>
      
      <section className="content-section">
        <div id="about-us">
          <h2 className="section-title">À propos de nous</h2>
          <AproposDeNous />
        </div>
      </section>

      <section className="contact-section">
        <div id="Contact">
          <h2 className="section-title">Contactez-nous</h2>
          <Contact />
        </div>
      </section>
    </div>
  );
}

export default Accueil;
