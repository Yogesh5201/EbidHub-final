import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './Header';
import Menu from './Menu';
import Bikes from './Bikes';
import Cars from './Cars';
import Contact from './Contact';
import About from './About';
import Login from './Login';
import I8 from './I8';
import M4 from './M4';
import Revuelto from './Revuelto';
import NotAvailable from './NotAvailable';
import './App.css';
import BiddingPage from './BiddingPage';

// Import Firebase from config
import { auth } from './firebase/config';

function Home({ user, onLogout }) {
  return (
    <div className="App">
      {/* Premium Background Elements */}
      <div className="premium-background">
        <div className="gold-particle particle-1"></div>
        <div className="gold-particle particle-2"></div>
        <div className="gold-particle particle-3"></div>
        <div className="gold-particle particle-4"></div>
        <div className="luxury-overlay"></div>
      </div>

      <Header user={user} onLogout={onLogout} />

      <main className="premium-main">
        <HeroSection user={user} />
        <StatsSection />
        <PreviousBidsSection />
        <TestimonialsSection />
        <DiscoverSection user={user} />
        <UpcomingAuctionSection user={user} />
      </main>

      <PremiumFooter />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="premium-loading">
        <div className="loading-spinner"></div>
        <p>Loading Premium Experience...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/i8" element={<I8 />} />
        <Route path="/m4" element={<M4 />} />
        <Route path="/revuelto" element={<Revuelto />} />
        <Route path="/profile" element={<NotAvailable />} />
        <Route path="/pre-register" element={<NotAvailable />} />
        <Route path="/schedule" element={<NotAvailable />} />
        <Route path="/catalog" element={<NotAvailable />} />
        <Route path="/automotive" element={<Cars />} />
        <Route path="/art" element={<NotAvailable />} />
        <Route path="/watches" element={<NotAvailable />} />
        <Route path="/real-estate" element={<NotAvailable />} />
        <Route path="/authentication" element={<NotAvailable />} />
        <Route path="/shipping" element={<NotAvailable />} />
        <Route path="/insurance" element={<NotAvailable />} />
        <Route path="/storage" element={<NotAvailable />} />
        <Route path="/careers" element={<NotAvailable />} />
        <Route path="/press" element={<NotAvailable />} />
        <Route path="*" element={<NotAvailable />} />
        
<Route path="/bidding/:vehicleId" element={<BiddingPage />} />
      </Routes>
    </Router>
  );
}

// Hero Section Component
function HeroSection({ user }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section className="premium-hero">
      {/* Premium Video Background */}
      <div className="video-container">
        <video
          className={`luxury-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          preload="auto"
        >
          <source src="/diamond.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-modern-watch-44675-large.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>
      
      {/* Animated Gold Particles */}
      <div className="hero-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="floating-gold" style={{
            animationDelay: `${i * 0.5}s`,
            left: `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="premium-hero-content">
        <div className="title-glow"></div>
        <h1 className="premium-title">
          <span className="title-line">World's Premier</span>
          <span className="title-line accent">Auction Destination</span>
        </h1>
        
        <p className="premium-subtitle">
          Discover extraordinary treasures and exclusive items from around the globe. 
          Where luxury meets legacy.
        </p>
        
        <div className="cta-container">
          <Link
            to={user ? "/menu" : "/login"}
            className="premium-cta primary"
          >
            <span className="cta-glow"></span>
            <i className="fas fa-gem"></i>
            Explore Auctions
          </Link>
          <Link
            to="/login"
            className="premium-cta secondary"
          >
            <i className="fas fa-crown"></i>
            Become a Member
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-item">
            <i className="fas fa-shield-alt"></i>
            <span>Verified Authenticity</span>
          </div>
          <div className="trust-item">
            <i className="fas fa-globe"></i>
            <span>Global Delivery</span>
          </div>
          <div className="trust-item">
            <i className="fas fa-lock"></i>
            <span>Secure Transactions</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Discover More</span>
      </div>
    </section>
  );
}

// Stats Section Component
function StatsSection() {
  const stats = [
    { number: "10K+", label: "Premium Listings", icon: "fas fa-gem" },
    { number: "$2B+", label: "Total Sales", icon: "fas fa-chart-line" },
    { number: "50K+", label: "Satisfied Clients", icon: "fas fa-users" },
    { number: "15+", label: "Years of Excellence", icon: "fas fa-award" }
  ];

  return (
    <section className="premium-stats">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-icon">
              <i className={stat.icon}></i>
            </div>
            <div className="stat-number" data-count={stat.number}>
              {stat.number}
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-glow"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Previous Bids Section Component
function PreviousBidsSection() {
  const previousBids = [
    {
      id: 1,
      title: "Paul Walker Supra Mk4",
      description: "1 of 1 limited edition from Fast & Furious franchise",
      price: "$900,000 USD",
      image: "/supra.jpg",
      alt: "Paul Walker Supra Mk4",
      category: "Automotive",
      year: "1994"
    },
    {
      id: 2,
      title: "Ducati Streetfighter V4",
      description: "1 of 50 Lamborghini edition, signed by factory team",
      price: "$50,000 USD",
      image: "/ducati street.jpg",
      alt: "Ducati Streetfighter V4",
      category: "Motorcycle",
      year: "2023"
    },
    {
      id: 3,
      title: "Red Vineyard",
      description: "Van Gogh's only painting sold during his lifetime",
      price: "$96,000,000 USD",
      image: "/red vineyard.jpg",
      alt: "Red Vineyard Painting",
      category: "Fine Art",
      year: "1888"
    }
  ];

  return (
    <section className="premium-previous-bids">
      <div className="section-header">
        <div className="section-badge">SOLD</div>
        <h2 className="section-title">Legendary Auctions</h2>
        <p className="section-subtitle">Iconic items that made history in our premium auctions</p>
      </div>
      
      <div className="bids-grid">
        {previousBids.map((bid, index) => (
          <AuctionCard 
            key={bid.id}
            bid={bid}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

// Auction Card Component
function AuctionCard({ bid, index }) {
  const handleImageError = (e) => {
    e.target.src = `https://via.placeholder.com/400x250/151515/c9a86d?text=${encodeURIComponent(bid.alt)}`;
  };

  return (
    <article 
      className="premium-auction-card" 
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="card-badge">{bid.category}</div>
      <div className="card-image-container">
        <div className="image-overlay"></div>
        <img 
          src={bid.image} 
          alt={bid.alt}
          className="card-image"
          onError={handleImageError}
        />
        <div className="card-year">{bid.year}</div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{bid.title}</h3>
        <p className="card-description">{bid.description}</p>
        
        <div className="card-footer">
          <div className="price-container">
            <span className="price-label">Final Bid</span>
            <span className="price-value">{bid.price}</span>
          </div>
          <div className="sold-badge">
            <i className="fas fa-gavel"></i>
            Auction Closed
          </div>
        </div>
      </div>
      
      <div className="card-glow"></div>
    </article>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "EbidHub helped me acquire the rarest Patek Philippe for my collection. Their authentication process is absolutely impeccable and their client service is beyond compare.",
      author: "James Vanderbilt",
      role: "Vintage Watch Collector",
      avatar: "JV",
      rating: 5
    },
    {
      id: 2,
      text: "The platform's intuitive design made my first art auction experience seamless. The customer service team went above and beyond to ensure every detail was perfect.",
      author: "Sophia Richardson",
      role: "Art Dealer & Curator",
      avatar: "SR",
      rating: 5
    },
    {
      id: 3,
      text: "Having sold over $2M in collectibles through EbidHub, I can confidently say their global reach attracts the most serious buyers. The premium service is worth every penny.",
      author: "Michael Zhang",
      role: "Estate Manager",
      avatar: "MZ",
      rating: 5
    }
  ];

  return (
    <section className="premium-testimonials">
      <div className="section-header center">
        <h2 className="section-title">Client Excellence</h2>
        <p className="section-subtitle">Trusted by collectors and connoisseurs worldwide</p>
      </div>
      
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className="testimonial-card"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="testimonial-header">
              <div className="client-avatar">
                {testimonial.avatar}
              </div>
              <div className="client-info">
                <h4 className="client-name">{testimonial.author}</h4>
                <p className="client-role">{testimonial.role}</p>
              </div>
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
            </div>
            
            <p className="testimonial-text">"{testimonial.text}"</p>
            
            <div className="testimonial-decoration">
              <i className="fas fa-quote-left"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Discover Section Component
function DiscoverSection({ user }) {
  return (
    <section className="premium-discover">
      <div className="discover-container">
        <div className="discover-content">
          <h2 className="discover-title">
            Curated Excellence <span className="accent">Awaits</span>
          </h2>
          <p className="discover-subtitle">
            Explore our handpicked collection of rare artifacts, luxury vehicles, 
            fine art, and exclusive collectibles from around the world.
          </p>
          
          <div className="discover-features">
            <div className="feature">
              <i className="fas fa-certificate"></i>
              <span>Verified Authenticity</span>
            </div>
            <div className="feature">
              <i className="fas fa-shipping-fast"></i>
              <span>Global White-Glove Delivery</span>
            </div>
            <div className="feature">
              <i className="fas fa-user-shield"></i>
              <span>VIP Concierge Service</span>
            </div>
          </div>
        </div>
        
        <Link
          to={user ? "/menu" : "/login"}
          className="premium-explore-btn"
        >
          <span className="btn-glow"></span>
          <i className="fas fa-compass"></i>
          Explore All Collections
        </Link>
      </div>
    </section>
  );
}

// Upcoming Auction Section Component
function UpcomingAuctionSection({ user }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/1000x500/151515/c9a86d?text=Exclusive+Auction+Item';
  };

  return (
    <section className="premium-upcoming">
      <div className="upcoming-container">
        <div className="upcoming-header">
          <div className="section-badge upcoming">COMING SOON</div>
          <h2 className="section-title">Exclusive Preview</h2>
          <p className="section-subtitle">
            Be the first to access our most anticipated auction of the year
          </p>
        </div>
        
        <div className="upcoming-showcase">
          <div className="showcase-image-container">
            <img 
              src="/gtr.jpg" 
              alt="Nissan GT-R Premium Edition" 
              className="showcase-image"
              onError={handleImageError}
            />
            <div className="image-glow"></div>
            <div className="premium-badge">
              <i className="fas fa-crown"></i>
              Premium Selection
            </div>
          </div>
          
          <div className="showcase-content">
            <h3 className="showcase-title">2024 Nissan GT-R Nismo</h3>
            <p className="showcase-description">
              Limited edition track-focused hypercar. 1 of 50 worldwide. 
              Featuring exclusive carbon fiber package and custom tuning by Nismo engineers.
            </p>
            
            <div className="auction-details">
              <div className="detail">
                <i className="fas fa-calendar"></i>
                <span>Auction Date: December 15, 2024</span>
              </div>
              <div className="detail">
                <i className="fas fa-map-marker-alt"></i>
                <span>Location: Dubai International Financial Centre</span>
              </div>
              <div className="detail">
                <i className="fas fa-clock"></i>
                <span>Estimate: $350,000 - $450,000</span>
              </div>
            </div>
            
            <div className="action-buttons">
              <Link
                to={user ? "/pre-register" : "/login"}
                className="premium-btn primary"
              >
                <i className="fas fa-star"></i>
                Pre-Register for Access
              </Link>
              <Link
                to="/catalog"
                className="premium-btn outline"
              >
                <i className="fas fa-book"></i>
                View Full Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  return (
    <section className="premium-contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="section-title">Concierge Service</h2>
          <p className="section-subtitle">
            Our dedicated team is ready to provide personalized assistance for all your auction needs
          </p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h4>VIP Client Services</h4>
              <p>Dedicated account managers for premium clients</p>
              <a href="tel:+7-1234567890" className="contact-link">
                <i className="fas fa-phone"></i>
                +7-1234567890
              </a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h4>Email Support</h4>
              <p>24/7 response from our expert team</p>
              <a href="mailto:concierge@ebidhub.com" className="contact-link">
                <i className="fas fa-envelope"></i>
                concierge@ebidhub.com
              </a>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4>Global Offices</h4>
              <p>Visit us at our luxury locations worldwide</p>
              <span className="contact-address">
                <i className="fas fa-building"></i>
                Luxury Tower, Auction District
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

// New Footer Component
function PremiumFooter() {
  return (
    <footer className="new-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="logo.png" alt="EbidHub" className="footer-logo" />
            <p className="footer-tagline">
              World's premier destination for luxury auctions and exclusive collectibles.
            </p>
            <div className="footer-badge">
              <i className="fas fa-award"></i>
              Trusted Since 2008
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-links">
            <div className="link-column">
              <h5>Auctions & Services</h5>
              <a href="/automotive">Automotive</a>
              <a href="/art">Fine Art</a>
              <a href="/watches">Luxury Watches</a>
              <a href="/real-estate">Real Estate</a>
              <a href="/authentication">Authentication</a>
              <a href="/shipping">Global Shipping</a>
              <a href="/insurance">Insurance</a>
              <a href="/storage">Secure Storage</a>
            </div>

            <div className="link-column">
              <h5>Company</h5>
              <a href="/about">About Us</a>
              <a href="/careers">Careers</a>
              <a href="/press">Press</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <p>&copy; 2024 EbidHub. All rights reserved.</p>
            <div className="legal-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>

          <div className="social-icons">
            <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
          </div>

          <div className="footer-security">
            <div className="security-badges">
              <i className="fas fa-shield-alt"></i>
              <span>256-bit SSL Encryption</span>
              <i className="fas fa-lock"></i>
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default App;