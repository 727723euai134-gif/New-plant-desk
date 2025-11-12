import React, { useState } from 'react';
import UnifiedNavbar from '../common/UnifiedNavbar';
import HeroCarousel from './HeroCarousel';
import AnimatedSectionWrapper from './AnimatedSectionWrapper';
import ContactSection from '../common/ContactSection';
import { NAV_PAGES } from '../../constants/navigation';
import { heroImages } from './PlaceholderImages';
import '../../styles/theme.css';
import './LandingPage.css';

const LandingPage = ({ currentPage, setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      segment: 'For Administrators',
      title: 'Transform Your Workplace with Living Greenery',
      subtitle: 'Boost employee wellness and productivity with our comprehensive plant management system. Monitor air quality, track maintenance, and create healthier work environments.',
      primaryCta: 'Start Free Trial',
      imageSrcSet: heroImages.admin
    },
    {
      id: 2,
      segment: 'For Customers',
      title: 'Effortless Plant Care for Your Space',
      subtitle: 'Enjoy beautiful, healthy plants without the hassle. Our expert team handles everything from selection to maintenance, so you can focus on what matters most.',
      primaryCta: 'Get Started',
      imageSrcSet: heroImages.customer
    },
    {
      id: 3,
      segment: 'For Maintenance Teams',
      title: 'Streamline Plant Care Operations',
      subtitle: 'Optimize your workflow with smart scheduling, real-time monitoring, and comprehensive plant health tracking. Deliver exceptional service efficiently.',
      primaryCta: 'Join Our Team',
      imageSrcSet: heroImages.worker
    }
  ];

  // Services data
  const services = [
    {
      id: 1,
      title: 'Plant Installation & Design',
      description: 'Custom plant arrangements tailored to your space, lighting, and aesthetic preferences.',
      icon: '🌿',
      price: 'From $299',
      features: ['Custom Design', 'Space Planning', 'Plant Selection'],
      cta: 'Learn More'
    },
    {
      id: 2,
      title: 'Maintenance & Care',
      description: 'Regular watering, pruning, fertilizing, and health monitoring by certified specialists.',
      icon: '🔧',
      price: 'From $99/month',
      features: ['Weekly Care', 'Health Monitoring', 'Expert Support'],
      cta: 'View Services'
    },
    {
      id: 3,
      title: 'Air Quality Monitoring',
      description: 'Real-time tracking of air purification benefits and environmental improvements.',
      icon: '🌬️',
      price: 'From $149/month',
      features: ['Real-time Data', 'Air Quality Reports', 'Health Insights'],
      cta: 'See Benefits'
    },
    {
      id: 4,
      title: 'Plant Health Analytics',
      description: 'Data-driven insights on plant performance and workspace wellness metrics.',
      icon: '📊',
      price: 'From $199/month',
      features: ['Performance Analytics', 'Wellness Metrics', 'Custom Reports'],
      cta: 'View Analytics'
    }
  ];

  const handleCtaClick = () => {
    setCurrentPage(NAV_PAGES.SIGNUP);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedNavbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSearch={handleSearch}
      />
      
      <main>
        {/* Hero Section */}
        <HeroCarousel 
          slides={heroSlides}
          onCtaClick={handleCtaClick}
        />
        

        
        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Plant-on-Desk?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proven benefits for your team and workspace
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                <div className="text-5xl font-bold text-green-600 mb-4">87%</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Improved Air Quality</h3>
                <p className="text-gray-600">Significant reduction in indoor pollutants and increased oxygen levels</p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                <div className="text-5xl font-bold text-green-600 mb-4">65%</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Increased Productivity</h3>
                <p className="text-gray-600">Enhanced focus and cognitive performance in plant-enriched environments</p>
              </div>
              
              <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                <div className="text-5xl font-bold text-green-600 mb-4">42%</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Reduced Stress</h3>
                <p className="text-gray-600">Lower cortisol levels and improved employee wellbeing</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workspace?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of companies creating healthier, more productive environments
            </p>
            <button 
              onClick={handleCtaClick}
              className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </section>
        
        {/* Contact Section */}
        <ContactSection />
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-green-400 mb-2">Plant-on-Desk</h3>
              <p className="text-gray-400">Creating healthier workspaces through expert plant care</p>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setCurrentPage(NAV_PAGES.ABOUT)} className="text-gray-400 hover:text-white transition-colors">About</button>
              <button onClick={() => setCurrentPage(NAV_PAGES.PLANS)} className="text-gray-400 hover:text-white transition-colors">Services</button>
              <button className="text-gray-400 hover:text-white transition-colors">Contact</button>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 Plant-on-Desk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;