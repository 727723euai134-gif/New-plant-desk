import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroCarousel from '../components/landing/HeroCarousel';

import { heroImages } from '../components/landing/PlaceholderImages';
import '../styles/theme.css';
import './Home.css';

const Home = () => {


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

  const handleCtaClick = () => {
    // Navigate to signup or login
    window.location.href = '/signup';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="h-[600px]">
          <HeroCarousel 
            slides={heroSlides}
            onCtaClick={handleCtaClick}
          />
        </div>
        
        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How Plant-on-Desk Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Simple steps to transform your workspace into a green paradise
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Choose Your Plan</h3>
                <p className="text-gray-600">Select from our flexible plans designed for every space and budget</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Expert Installation</h3>
                <p className="text-gray-600">Our certified plant specialists design and install your perfect green setup</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Ongoing Care</h3>
                <p className="text-gray-600">Relax while we handle watering, pruning, and health monitoring</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied customers who've transformed their workspaces
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">Marketing Director</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"Our office productivity increased by 40% after installing plants. The air quality improvement is noticeable!"</p>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                    <p className="text-sm text-gray-600">Tech Startup CEO</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"The maintenance service is exceptional. Our plants are thriving and our team loves the green environment."</p>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    E
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Emily Rodriguez</h4>
                    <p className="text-sm text-gray-600">HR Manager</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">"Employee satisfaction scores went up significantly. The plants create such a calming atmosphere."</p>
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>
        </section>
        
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
        
        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See the impact we've made across different industries
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                <p className="text-gray-300">Companies Served</p>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
                <p className="text-gray-300">Plants Maintained</p>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">98%</div>
                <p className="text-gray-300">Customer Satisfaction</p>
              </div>
              <div className="group">
                <div className="text-5xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <p className="text-gray-300">Expert Support</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=400&fit=crop" alt="Plants" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Workspace?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of companies creating healthier, more productive environments with our expert plant care services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleCtaClick}
                className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105"
              >
                View Plans
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;