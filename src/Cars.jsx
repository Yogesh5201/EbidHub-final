import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './Cars.css';

function Cars() {
  return (
    <div className="cars-page">
      <Header />

      <section className="category-section">
        <Link to="/m4">
          <div className="car-item">
            <img src="m4.jpg" alt="BMW M4" />
            <h3>BMW M4</h3>
          </div>
        </Link>
        <Link to="/revuelto">
          <div className="car-item">
            <img src="revuelto.jpg" alt="Lamborghini Revuelto" />
            <h3>Lamborghini Revuelto</h3>
          </div>
        </Link>
        <Link to="/i8">
          <div className="car-item">
            <img src="i8.jpg" alt="BMW i8" />
            <h3>BMW i8</h3>
          </div>
        </Link>
      </section>

      <footer className="category-footer">
        <p>&copy;2024 EbidHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Cars;