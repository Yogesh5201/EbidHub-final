import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './About.css';

function About() {

  useEffect(() => {
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* Background pattern */}
      <div className="background-pattern"></div>
      
      {/* Premium details */}
      <div className="premium-detail detail-1"></div>
      <div className="premium-detail detail-2"></div>
      <div className="premium-detail detail-3"></div>
      <div className="premium-detail detail-4"></div>
      
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="fade-in">About EbidHub</h1>
            <p className="hero-subtitle fade-in">
              Discover the story behind the world's premier auction destination for luxury collectibles and rare investments
            </p>

            <div className="hero-stats">
              <div className="stat-item fade-in">
                <div className="stat-number">14+</div>
                <div className="stat-label">Years of Excellence</div>
              </div>
              <div className="stat-item fade-in">
                <div className="stat-number">$2.3B+</div>
                <div className="stat-label">Total Sales</div>
              </div>
              <div className="stat-item fade-in">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Luxury Items</div>
              </div>
            </div>

            <div className="hero-cta">
              <div className="cta-buttons">
                <Link to="/menu" className="cta-primary">
                  <i className="fas fa-gem"></i>
                  View Auctions
                </Link>
                <Link to="/contact" className="cta-secondary">
                  <i className="fas fa-headset"></i>
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <h2 className="section-title fade-in">Our Story</h2>
          
          <div className="about-content">
            <div className="about-text fade-in">
              <h2>Redefining Luxury Auctions Since 2010</h2>
              <p>EbidHub was established with a singular vision: to create the world's most exclusive and trusted auction platform for rare collectibles, luxury items, and unique investments. What began as a niche service for discerning collectors has grown into a global marketplace with billions in annual transactions.</p>
              <p>We believe in the power of connection – bringing together passionate collectors with the world's most sought-after items. Our platform combines cutting-edge technology with traditional auction expertise to create an unparalleled experience for both buyers and sellers.</p>
              <p>Over the years, we've facilitated the sale of some of the world's most valuable items, from rare vintage automobiles to iconic works of art. Each auction is carefully curated to maintain the highest standards of quality and authenticity.</p>
              <Link to="/" className="back-btn">
                <i className="fas fa-arrow-left"></i>
                Back to Home
              </Link>
            </div>
          </div>
          
          <div className="values-grid">
            <div className="value-card fade-in">
              <div className="value-icon">
                <i className="fas fa-gem"></i>
              </div>
              <h3>Exclusivity</h3>
              <p>We carefully curate our auctions to feature only the most exceptional and rare items available on the market.</p>
            </div>
            
            <div className="value-card fade-in">
              <div className="value-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Authentication</h3>
              <p>Every item undergoes rigorous verification by our team of experts to ensure authenticity and quality.</p>
            </div>
            
            <div className="value-card fade-in">
              <div className="value-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Global Reach</h3>
              <p>Our platform connects buyers and sellers from around the world, creating a truly international marketplace.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-col">
            <h3>EbidHub</h3>
            <p>World's premier auction destination for rare collectibles and luxury items.</p>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/menu">Auctions</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Info</h3>
            <p>Luxury Tower, Auction District</p>
            <p>Email: info@ebidhub.com</p>
            <p>Phone: +7-1234567890</p>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2024 EbidHub. All rights reserved. Premium Online Auction Platform</p>
        </div>
      </footer>
    </div>
  );
}

export default About;