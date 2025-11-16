import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Bikes.css';

function Motorcycles() {
  return (
    <div className="motorcycles-page">
      <Header />

      <section className="category-section">
        <Link to="/not-available">
          <div className="car-item">
            <img src="ducati.jpg" alt="Ducati Panigale V4" />
            <h3>Ducati Panigale V4</h3>
          </div>
        </Link>
        <Link to="/not-available">
          <div className="car-item">
            <img src="s1000rr.jpg" alt="BMW s1000rr" />
            <h3>BMW s1000rr</h3>
          </div>
        </Link>
        <Link to="/not-available">
          <div className="car-item">
            <img src="h2r.jpg" alt="Ninja H2R" />
            <h3>Ninja H2R</h3>
          </div>
        </Link>
      </section>

      <footer className="category-footer">
        <p>&copy;2024 Pandora's Box. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Motorcycles;