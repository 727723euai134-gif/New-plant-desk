import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroCarousel = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: false,
    arrows: false,
    dotsClass: 'slick-dots !bottom-8 !z-10',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 3000
        }
      }
    ]
  };

  const slides = [
    {
      id: 1,
      image: 'https://plus.unsplash.com/premium_photo-1678653651062-0d2456c00ab9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fHBsYW50cyUyMGdyZWVuaXNoJTIwaW4lMjBwb3RzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      title: 'Transform Your Workspace',
      subtitle: 'with Premium Plant Collections',
      emoji: '🌿',
      cta: 'Explore Now'
    },
    {
      id: 2,
      image: 'https://plus.unsplash.com/premium_photo-1678653651678-31bf05a58350?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHBsYW50cyUyMGdyZWVuaXNoJTIwaW4lMjBwb3RzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600',
      title: 'Green Living Made Simple',
      subtitle: 'Smart Care for Modern Spaces',
      emoji: '🌱',
      cta: 'Discover More'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1649314429297-08fcacea1c15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEwfHxwbGFudHMlMjBncmVlbmlzaCUyMGluJTIwcG90c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600',
      title: 'Breathe Fresh Air',
      subtitle: 'Natural Solutions for Every Office',
      emoji: '🌾',
      cta: 'Get Started'
    },
    {
      id: 4,
      image: 'https://plus.unsplash.com/premium_photo-1713935397769-ba7babcc3928?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBsYW50cyUyMGdyZWVuaXNoJTIwaW4lMjBwb3RzJTIwaW4lMjBidWlsZGluZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600',
      title: 'Elevate Your Environment',
      subtitle: 'Professional Plant Management',
      emoji: '🍃',
      cta: 'Join Today'
    }
  ];

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] md:min-h-[500px] sm:h-[60vh] sm:min-h-[400px] overflow-hidden">
      <Slider {...settings} ref={sliderRef} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[80vh] min-h-[600px] md:min-h-[500px] sm:h-[60vh] sm:min-h-[400px] outline-none">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-green-600/40 to-black/30 flex items-center justify-center">
                <div className="text-center text-white max-w-5xl px-8 md:px-4">
                  <div className="animate-slide-up opacity-0 animation-delay-300">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-4 drop-shadow-2xl leading-tight tracking-tight">
                      <span className="animate-text-glow">{slide.title}</span>
                    </h1>
                  </div>
                  <div className="animate-slide-up opacity-0 animation-delay-600">
                    <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 drop-shadow-lg opacity-90 tracking-wide">
                      {slide.subtitle} <span className="animate-bounce inline-block">{slide.emoji}</span>
                    </p>
                  </div>
                  <div className="animate-slide-up opacity-0 animation-delay-900">
                    <button className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-12 md:py-4 md:px-10 sm:py-3 sm:px-8 rounded-full text-xl md:text-lg transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl hover:shadow-green-500/50 uppercase tracking-widest border-2 border-white/20 hover:border-white/40">
                      <span className="group-hover:animate-pulse">{slide.cta}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      
      {/* Navigation Arrows */}
      <button 
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-6 h-6 text-white group-hover:text-green-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
      >
        <svg className="w-6 h-6 text-white group-hover:text-green-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 1s ease-out forwards;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        
        .animate-text-glow {
          animation: textGlow 2s ease-in-out infinite alternate;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes textGlow {
          from {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(76, 175, 80, 0.3);
          }
          to {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(76, 175, 80, 0.6);
          }
        }
        
        :global(.slick-dots li button) {
          width: 14px !important;
          height: 14px !important;
          border-radius: 50% !important;
          background: rgba(255, 255, 255, 0.6) !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          transition: all 0.4s ease !important;
        }
        
        :global(.slick-dots li button:before) {
          display: none !important;
        }
        
        :global(.slick-dots li.slick-active button) {
          background: white !important;
          border-color: rgba(76, 175, 80, 0.8) !important;
          transform: scale(1.4) !important;
          box-shadow: 0 0 15px rgba(76, 175, 80, 0.5) !important;
        }
        
        :global(.slick-dots li button:hover) {
          background: rgba(255, 255, 255, 0.9) !important;
          transform: scale(1.2) !important;
        }
        
        :global(.slick-dots li) {
          margin: 0 6px !important;
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;