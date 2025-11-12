import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NAV_PAGES } from '../../constants/navigation';
import SearchBar from '../common/SearchBar';
import './StickyHeader.css';

const StickyHeader = ({ currentPage, setCurrentPage, onSearch }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setProfileOpen(false);
      setIsSearchOpen(false);
    };
    if (profileOpen || isSearchOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileOpen, isSearchOpen]);

  const navLinks = [
    { name: 'Home', page: NAV_PAGES.HOME },
    { name: 'Services', page: NAV_PAGES.PLANS },
    { name: 'About', page: NAV_PAGES.ABOUT },
    { name: 'Contact', page: NAV_PAGES.HOME, anchor: '#contact' },
  ];

  const handleNavClick = (page, anchor) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    if (anchor) {
      setTimeout(() => {
        const element = document.querySelector(anchor);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container" aria-label="Main navigation">
        {/* Brand */}
        <button 
          onClick={() => handleNavClick(NAV_PAGES.HOME)}
          className="navbar-brand"
        >
          our plant on desk
        </button>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page, link.anchor)}
              className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Utility Cluster */}
        <div className="utility-cluster">
          {/* Search */}
          <SearchBar onSearch={onSearch} placeholder="Search services, plants..." />

          {/* Dashboard Button */}
          {isAuthenticated && (
            <button
              onClick={() => {
                switch(user?.role) {
                  case 'ADMIN':
                    handleNavClick(NAV_PAGES.ADMIN_DASHBOARD);
                    break;
                  case 'CUSTOMER':
                    handleNavClick(NAV_PAGES.CUSTOMER_DASHBOARD);
                    break;
                  case 'TECHNICIAN':
                    handleNavClick(NAV_PAGES.TECHNICIAN_DASHBOARD);
                    break;
                  default:
                    handleNavClick(NAV_PAGES.HOME);
                }
              }}
              className="dashboard-btn"
              role="button"
              aria-label="Go to Dashboard"
            >
              Dashboard
            </button>
          )}

          {/* Profile / Auth */}
          {isAuthenticated ? (
            <div className="profile-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen(!profileOpen);
                }}
                className="profile-avatar"
                aria-label="Profile menu"
              >
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </button>
              {profileOpen && (
                <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="profile-info">
                    <p className="profile-name">{user?.username}</p>
                    <p className="profile-role">{user?.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setCurrentPage(NAV_PAGES.HOME);
                      setProfileOpen(false);
                    }}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button
                onClick={() => handleNavClick(NAV_PAGES.LOGIN)}
                className="login-btn"
              >
                Login
              </button>
              <button
                onClick={() => handleNavClick(NAV_PAGES.SIGNUP)}
                className="signup-btn primary-cta"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page, link.anchor)}
                className="mobile-nav-link"
              >
                {link.name}
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    switch(user?.role) {
                      case 'ADMIN':
                        handleNavClick(NAV_PAGES.ADMIN_DASHBOARD);
                        break;
                      case 'CUSTOMER':
                        handleNavClick(NAV_PAGES.CUSTOMER_DASHBOARD);
                        break;
                      case 'TECHNICIAN':
                        handleNavClick(NAV_PAGES.TECHNICIAN_DASHBOARD);
                        break;
                      default:
                        handleNavClick(NAV_PAGES.HOME);
                    }
                  }}
                  className="mobile-nav-link"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setCurrentPage(NAV_PAGES.HOME);
                    setIsMenuOpen(false);
                  }}
                  className="mobile-nav-link logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick(NAV_PAGES.LOGIN)}
                  className="mobile-nav-link"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick(NAV_PAGES.SIGNUP)}
                  className="mobile-nav-link primary"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default StickyHeader;