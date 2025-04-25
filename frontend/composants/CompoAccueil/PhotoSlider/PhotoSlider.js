import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import './PhotoSlider.css';

const slides = [
  {
    image: '/img/img1.jpg',
    title: 'Bienvenue sur notre plateforme',
    description: 'Découvrez des opportunités uniques pour faire évoluer votre carrière.',
    action: 'scroll', // déclenche un scroll
  },
  {
    image: '/img/img2.jpg',
    title: 'Trouvez votre emploi idéal',
    description: 'Des milliers d\'offres d\'emploi dans tous les secteurs',
    link: '/Offres',
  },
  {
    image: '/img/img3.jpg',
    title: 'Recrutez les meilleurs talents',
    description: 'Publiez vos offres et trouvez les candidats qui correspondent à vos besoins.',
    link: '/Recruteurs',
  },
];

const PhotoSlider = () => {
  // Fonction de scroll vers la section avec l'ID "apropos"
  const scrollToApropos = () => {
    const section = document.getElementById('apropos');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-slider-wrapper ltr">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider-container">
              <img src={slide.image} alt={`Slide ${index}`} className="slider-img" />

              <div className="slider-overlay">
                <div className="hero-box">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>

                  {slide.action === 'scroll' ? (
                    <button onClick={scrollToApropos} className="btn-primary">
                      En savoir plus
                    </button>
                  ) : (
                    <Link to={slide.link} className="btn-primary">
                      En savoir plus
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PhotoSlider;