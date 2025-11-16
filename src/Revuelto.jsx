import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './ProductPage.css';

function Revuelto() {
  return (
    <div className="product-page">
      <Header />

      <section className="video-section">
        <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
          <iframe 
            src="https://player.vimeo.com/video/1116779727?badge=0&autopause=0&autoplay=1&muted=1&controls=0&loop=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
            title="revuelto">
          </iframe>
          <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: '60px', zIndex: 2, background: 'transparent'}}></div>
        </div>
      </section>
      
      <section className="product-info">
        <h2>Lamborghini Revuelto</h2>
        <p>The Lamborghini Revuelto is the first HPEV (High Performance Electrified Vehicle) hybrid super sports car from Sant'Agata Bolognese, marking a revolutionary step forward for the brand. With a completely new 6.5L V12 engine and three electric motors delivering a combined 1,001 horsepower, the Revuelto represents the pinnacle of Lamborghini's performance legacy. Its cutting-edge design, aerospace-inspired aerodynamics, and plug-in hybrid technology create an unprecedented driving experience that honors Lamborghini's tradition while boldly stepping into the future.</p>
      </section>
      
      <section className="storytime-section">
        <h2>Legend of the Treasure</h2>
        <p>
          The Lamborghini Revuelto represents a radical evolution of the V12 heritage that has defined the brand for decades. As the successor to the iconic Aventador, the Revuelto breaks new ground with its innovative hybrid powertrain that combines a naturally aspirated 6.5L V12 engine with three electric motors. This setup generates a staggering 1,001 CV (1,015 PS) and enables all-wheel drive as well as electric torque vectoring for unprecedented handling precision. The Revuelto's monofuselage and frame are made entirely of carbon fiber, making it exceptionally light and rigid. Its design incorporates aerospace-inspired elements with sharp lines and hexagonal themes that pay homage to Lamborghini's DNA while projecting into the future. The Revuelto can reach 0-100 km/h in just 2.5 seconds and features a top speed of over 350 km/h. With its revolutionary technology and breathtaking performance, the Revuelto establishes a new benchmark for hybrid super sports cars while maintaining the emotional connection that defines every Lamborghini.
        </p>
        <h2>Bid starts from - $600,000</h2>
      </section>

      <div className="bid-now-container">
  <Link className="bid-now-btn" to="/bidding/revuelto">
    Join Live Auction<span className="btn-icon">→</span>
  </Link>
</div>
      
      <footer>
        <p>&copy; 2024 EbidHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Revuelto;