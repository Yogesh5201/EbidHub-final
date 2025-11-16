import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ref, push, onValue, onDisconnect, serverTimestamp, set } from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { database, auth } from './firebase/config';
import Header from './Header';
import './BiddingPage.css';

function BiddingPage() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [databaseError, setDatabaseError] = useState(null);

  const vehicles = {
    'i8': { 
      name: 'BMW i8', 
      image: '/i8.jpg', 
      basePrice: 120000,
      description: 'The BMW i8 redefined the sports car of the future with its groundbreaking plug-in hybrid technology and visionary design.',
      video: '/i8.mp4'
    },
    'revuelto': { 
      name: 'Lamborghini Revuelto', 
      image: '/revuelto.jpg', 
      basePrice: 600000,
      description: 'The first HPEV hybrid super sports car from Sant\'Agata Bolognese with 1,001 horsepower.',
      video: '/revuelto.mp4'
    },
    'm4': { 
      name: 'BMW M4 Competition', 
      image: '/m4.jpg', 
      basePrice: 85000,
      description: 'The pinnacle of BMW\'s motorsport engineering for the road with 503 horsepower.',
      video: '/m4.mp4'
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setupUserPresence(user);
      } else {
        navigate('/login');
      }
    });

    if (vehicleId && vehicles[vehicleId]) {
      setVehicle(vehicles[vehicleId]);
      setupBidListeners(vehicleId);
    } else {
      setLoading(false);
    }

    setupOnlineUsersListener();

    return () => {
      unsubscribeAuth();
    };
  }, [vehicleId, navigate]);

  const setupUserPresence = (user) => {
    try {
      const userStatusRef = ref(database, 'status/' + user.uid);

      set(userStatusRef, {
        online: true,
        email: user.email,
        last_changed: serverTimestamp()
      });

      onDisconnect(userStatusRef).set({
        online: false,
        email: user.email,
        last_changed: serverTimestamp()
      });
    } catch (error) {
      console.error('Error setting up user presence:', error);
      setDatabaseError('Failed to connect to live bidding service');
    }
  };

  const setupBidListeners = (vehicleId) => {
    try {
      const bidsRef = ref(database, 'bids/' + vehicleId);

      onValue(bidsRef, (snapshot) => {
        const bidsData = snapshot.val();
        if (bidsData) {
          const bidsArray = Object.values(bidsData)
            .sort((a, b) => b.amount - a.amount);
          setBids(bidsArray);
        } else {
          setBids([]);
        }
        setLoading(false);
      }, (error) => {
        console.error('Error listening to bids:', error);
        setDatabaseError('Failed to load bids. Please check your connection.');
        setLoading(false);
      });
    } catch (error) {
      console.error('Error setting up bid listeners:', error);
      setDatabaseError('Failed to connect to bidding service');
      setLoading(false);
    }
  };

  const setupOnlineUsersListener = () => {
    const usersRef = ref(database, 'status');
    
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const onlineUsersArray = Object.values(usersData)
          .filter(user => user.online && user.email !== currentUser?.email);
        setOnlineUsers(onlineUsersArray);
      }
    });
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    
    const bidValue = parseFloat(bidAmount);
    const currentHighest = getCurrentBid();

    if (!bidValue || bidValue <= 0) {
      alert('Please enter a valid bid amount');
      return;
    }

    if (bidValue <= currentHighest) {
      alert(`Your bid must be higher than the current bid of $${currentHighest.toLocaleString()}`);
      return;
    }

    if (!currentUser) {
      alert('Please log in to place a bid');
      return;
    }

    try {
      const bidsRef = ref(database, 'bids/' + vehicleId);
      const newBidRef = push(bidsRef);
      
      await set(newBidRef, {
        amount: bidValue,
        bidder: currentUser.email,
        bidderName: currentUser.displayName || currentUser.email.split('@')[0],
        timestamp: Date.now(),
        vehicle: vehicleId
      });

      setBidAmount('');
      setDatabaseError(null); // Clear any previous errors on success
    } catch (error) {
      console.error('Error placing bid:', error);
      setDatabaseError('Failed to place bid. Please try again.');
    }
  };

  const getCurrentBid = () => {
    return bids.length > 0 ? bids[0].amount : vehicle?.basePrice || 0;
  };

  const getHighestBidder = () => {
    return bids.length > 0 ? bids[0].bidderName : 'No bids yet';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="bidding-loading">
        <div className="loading-spinner"></div>
        <p>Loading Auction...</p>
      </div>
    );
  }

  if (databaseError) {
    return (
      <div className="bidding-page">
        <Header />
        <div className="error-container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Connection Issue</h3>
            <p>{databaseError}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Retry Connection
            </button>
            <Link to="/cars" className="back-link">Back to Cars</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="bidding-error">
        <Header />
        <div className="error-content">
          <h2>Vehicle Not Found</h2>
          <p>The vehicle you're looking for doesn't exist.</p>
          <Link to="/cars" className="back-btn">Back to Cars</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bidding-page">
      <Header />
      
      <div className="bidding-container">
        <div className="bidding-header">
          <div className="header-content">
            <h1>Live Auction: {vehicle.name}</h1>
            <div className="user-info">
              <span>Welcome, {currentUser?.displayName || currentUser?.email}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </div>
        </div>

        <div className="bidding-content">
          {/* Vehicle Display Section */}
          <div className="vehicle-display">
            <div className="vehicle-media">
              <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
              <div className="vehicle-video">
                <video autoPlay muted loop playsInline>
                  <source src={vehicle.video} type="video/mp4" />
                </video>
              </div>
            </div>
            
            <div className="vehicle-info">
              <h2>{vehicle.name}</h2>
              <p>{vehicle.description}</p>
              
              <div className="current-bid-info">
                <div className="bid-stats">
                  <div className="stat">
                    <span className="label">Current Bid</span>
                    <span className="value">${getCurrentBid().toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Highest Bidder</span>
                    <span className="value">{getHighestBidder()}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Total Bids</span>
                    <span className="value">{bids.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bidding Interface */}
          <div className="bidding-interface">
            <div className="bid-form-section">
              <h3>Place Your Bid</h3>
              <form onSubmit={handlePlaceBid} className="bid-form">
                <div className="bid-input-group">
                  <label>Your Bid Amount</label>
                  <div className="input-with-symbol">
                    <span className="currency-symbol">$</span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`Minimum: $${(getCurrentBid() + 1000).toLocaleString()}`}
                      min={getCurrentBid() + 1000}
                      step="1000"
                      required
                    />
                  </div>
                  <small>Minimum bid increase: $1,000</small>
                </div>
                
                <button 
                  type="submit" 
                  className="place-bid-btn"
                  disabled={!bidAmount || parseFloat(bidAmount) <= getCurrentBid()}
                >
                  <i className="fas fa-gavel"></i>
                  Place Bid
                </button>
              </form>
            </div>

            {/* Live Bidders */}
            <div className="live-bidders">
              <h3>Live Bidders ({onlineUsers.length + 1})</h3>
              <div className="bidders-list">
                <div className="bidder you">
                  <span className="bidder-name">You ({currentUser?.email})</span>
                  <span className="status online">●</span>
                </div>
                {onlineUsers.map((user, index) => (
                  <div key={index} className="bidder">
                    <span className="bidder-name">{user.email}</span>
                    <span className="status online">●</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bid History */}
          <div className="bid-history-section">
            <h3>Bid History</h3>
            <div className="bids-list">
              {bids.length === 0 ? (
                <div className="no-bids">
                  <i className="fas fa-clock"></i>
                  <p>No bids yet. Be the first to bid!</p>
                </div>
              ) : (
                bids.map((bid, index) => (
                  <div 
                    key={index} 
                    className={`bid-item ${bid.bidder === currentUser?.email ? 'your-bid' : ''}`}
                  >
                    <div className="bidder-info">
                      <span className="bidder-name">
                        {bid.bidder === currentUser?.email ? 'You' : bid.bidderName}
                        {index === 0 && <span className="leading-bid">🏆 Leading</span>}
                      </span>
                      <span className="bid-time">
                        {new Date(bid.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="bid-amount">${bid.amount.toLocaleString()}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bidding-footer">
          <Link to="/cars" className="back-link">
            <i className="fas fa-arrow-left"></i>
            Back to Cars
          </Link>
          <div className="auction-info">
            <span>Auction ends in: 2 days 14:32:15</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BiddingPage;