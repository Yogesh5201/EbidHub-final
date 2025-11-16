import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './ProductPage.css';

function M4() {
  return (
    <div className="product-page">
      <Header />

      <section className="video-section">
        <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
          <iframe 
            src="https://player.vimeo.com/video/1116779661?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&controls=0&loop=1" 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
            title="m4">
          </iframe>
          <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, background: 'transparent'}}></div>
        </div>
      </section>
      
      <section className="product-info">
        <h2>BMW M4 Competition</h2>
        <p>The BMW M4 Competition represents the pinnacle of BMW's motorsport engineering for the road. With its aggressive styling, iconic kidney grille, and a twin-turbocharged 3.0-liter inline-six engine producing 503 horsepower, the M4 delivers explosive performance. Featuring track-bred technology, precision handling, and a motorsport-inspired interior, this ultimate driving machine dominates both road and track with uncompromising prowess.</p>
      </section>
      
      <section className="storytime-section">
        <h2>Legend of the Treasure</h2>
        <p>
          The BMW M4 Competition continues the legacy of BMW's most celebrated sports coupes, embodying decades of motorsport expertise. This track-focused machine features a high-revving S58 twin-turbo inline-6 engine that unleashes 503 horsepower and 479 lb-ft of torque, propelling it from 0-60 mph in just 3.8 seconds. Its aggressive design with the controversial yet distinctive large kidney grille makes an undeniable statement. The M4 Competition comes equipped with adaptive M suspension, an M Sport differential, and carbon fiber reinforced plastic components that reduce weight while increasing rigidity. Inside, the M-specific cockpit with carbon fiber buckets immerses the driver in a pure performance environment. As the successor to the legendary M3 coupe, the M4 Competition represents the ultimate expression of BMW's performance philosophy, blending everyday usability with racetrack capability.
        </p>
        <h2>Bid starts from - $85,000</h2>
      </section>

      <div className="bid-now-container">
  <Link className="bid-now-btn" to="/bidding/m4">
    Join Live Auction<span className="btn-icon">→</span>
  </Link>
</div>
      
      <footer>
        <p>&copy; 2024 EbidHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default M4;