import React from 'react';
import Header from './Header';
import './NotAvailable.css';

function NotAvailable() {
  return (
    <div className="notavailable-page">
      <Header />
      <div className="coming-soon-container">
        <h1>Product Not Available</h1>
        <p>Coming soon, you will be notified.</p>
      </div>
    </div>
  );
}

export default NotAvailable;