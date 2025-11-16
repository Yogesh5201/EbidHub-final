import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './ProductPage.css';

function I8() {
  return (
    <div className="product-page">
      <Header />

      <section className="video-section">
        <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
          <iframe 
            src="https://player.vimeo.com/video/1116795430?autoplay=1&muted=1&loop=1&background=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            referrerPolicy="strict-origin-when-cross-origin" 
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
            title="i8">
          </iframe>
        </div>
      </section>
      
      <section className="product-info">
        <h2>BMW i8</h2>
        <p>The BMW i8 redefined the sports car of the future with its groundbreaking plug-in hybrid technology and visionary design. With its futuristic scissor doors, lightweight carbon-fiber body, and a combined 369 horsepower from its turbocharged engine and electric motor, the i8 delivers breathtaking performance with remarkable efficiency. This innovative masterpiece combines sustainability with supercar excitement.</p>
      </section>
      
      <section className="storytime-section">
        <h2>Legend of the Treasure</h2>
        <p>
          The BMW i8 emerged as a revolutionary vision of sustainable performance, blending cutting-edge technology with breathtaking design. As BMW's first plug-in hybrid sports car, it broke conventions with its LifeDrive architecture featuring a carbon-fiber-reinforced plastic passenger cell. The i8's dramatic butterfly doors and laser headlights signaled a new era of automotive innovation. Its turbocharged 1.5-liter three-cylinder engine paired with an electric motor delivered supercar acceleration while achieving exceptional fuel efficiency. The i8 represented BMW's commitment to "Efficient Dynamics," proving that environmental consciousness could coexist with thrilling performance. This technological tour de force remains a landmark vehicle that paved the way for the future of sports cars.
        </p>
        <h2>Bid starts from - $120,000</h2>
      </section>

      <div className="bid-now-container">
  <Link className="bid-now-btn" to="/bidding/i8">
    Join Live Auction<span className="btn-icon">→</span>
  </Link>
</div>
      
      <footer>
        <p>&copy; 2024 EbidHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default I8;