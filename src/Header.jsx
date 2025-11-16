import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from './firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './About.css';

function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User signed out successfully');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <header style={{width: '100vw'}}>
        <div className="header-container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw'}}>
          <Link to="/" className="logo">
            <img src="/logo.png" alt="EbidHub Logo" />
            EbidHub
          </Link>
          <div className="loading">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header style={{width: '100vw'}}>
      <div className="header-container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw'}}>
        <Link to="/" className="logo">
          <img src="/logo.png" alt="EbidHub Logo" />
          EbidHub
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-menu">
            <li>
              <Link to={user ? "/menu" : "/login"} className="nav-link">
                <i className="fas fa-bars"></i> Menu
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                <i className="fas fa-info-circle"></i> About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                <i className="fas fa-envelope"></i> Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className={`header-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="auth-buttons">
            {user ? (
              <div className="user-profile" onClick={() => window.location.href = '/profile'}>
                <div className="user-avatar">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <span className="username">{user.displayName || user.email}</span>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/login?form=register" className="btn-signup">Sign Up</Link>
              </>
            )}
          </div>

          {user && (
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
