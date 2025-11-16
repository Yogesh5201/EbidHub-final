import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 40, density: { enable: true, value_area: 800 } },
          color: { value: "#c9a86d" },
          opacity: { value: 0.3, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#c9a86d",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out"
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        }
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const showMessage = (text, type = 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        showMessage('Login successful! Redirecting...', 'success');
        setTimeout(() => navigate('/menu'), 1500);
      } else {
        if (formData.password !== formData.confirmPassword) {
          showMessage('Passwords do not match');
          setLoading(false);
          return;
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await userCredential.user.updateProfile({
          displayName: formData.name
        });
        
        showMessage('Account created successfully! Redirecting...', 'success');
        setTimeout(() => navigate('/menu'), 1500);
      }
    } catch (error) {
      showMessage(getFriendlyError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      showMessage('Authentication successful! Redirecting...', 'success');
      setTimeout(() => navigate('/menu'), 1500);
    } catch (error) {
      showMessage(getFriendlyError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      showMessage('Please enter your email address first');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, formData.email);
      showMessage('Password reset email sent! Check your inbox.', 'success');
    } catch (error) {
      showMessage(getFriendlyError(error.code));
    }
  };

  const getFriendlyError = (errorCode) => {
    const errorMap = {
      'auth/invalid-email': 'Invalid email address format.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/operation-not-allowed': 'Email/password accounts are not enabled.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/popup-closed-by-user': 'Sign-in was canceled.',
      'auth/cancelled-popup-request': 'Only one sign-in request allowed at a time.'
    };
    
    return errorMap[errorCode] || 'An error occurred. Please try again.';
  };

  return (
    <div className="auth-page">
      {/* Background Overlay */}
      <div className="background-overlay"></div>
      
      {/* Particles Container */}
      <div className="particles-container" id="particles-js"></div>
      
      {/* Return to Home - Moved Down */}
      <div className="return-home">
        <Link to="/">
          <i className="fas fa-arrow-left"></i> Back to Home
        </Link>
      </div>
      
      {/* Messages */}
      {message.text && (
        <div className={`auth-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="auth-container">
        {/* Login Form */}
        <div className={`auth-box ${isLogin ? 'active' : ''}`}>

          <form onSubmit={handleEmailAuth}>
            <div className="input-group">
              <label htmlFor="login-email">Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  id="login-email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  required 
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="login-password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password" 
                  required 
                />
              </div>
            </div>
            
            <div className="remember-forgot">
              <label>
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                /> 
                Remember me
              </label>
              <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                'Login to EbidHub'
              )}
            </button>
          </form>
          
          <div className="separator">
            <span>Or continue with</span>
          </div>
          
          <button className="btn btn-google" onClick={handleGoogleAuth} disabled={loading}>
            <i className="fab fa-google"></i> Sign in with Google
          </button>
          
          <div className="switch-form">
            <p>Don't have an account? <a href="#" onClick={() => setIsLogin(false)}>Join EbidHub</a></p>
          </div>
        </div>
        
        {/* Register Form */}
        <div className={`auth-box ${!isLogin ? 'active' : ''}`}>

          <form onSubmit={handleEmailAuth}>
            <div className="input-group">
              <label htmlFor="register-name">Full Name</label>
              <div className="input-wrapper">
                <i className="fas fa-user"></i>
                <input 
                  type="text" 
                  id="register-name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="register-email">Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  id="register-email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email" 
                  required 
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="register-password">Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="register-password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password" 
                  required 
                />
              </div>
            </div>
            
            <div className="input-group">
              <label htmlFor="register-confirm">Confirm Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  id="register-confirm" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password" 
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create EbidHub Account'
              )}
            </button>
          </form>
          
          <div className="separator">
            <span>Or sign up with</span>
          </div>
          
          <button className="btn btn-google" onClick={handleGoogleAuth} disabled={loading}>
            <i className="fab fa-google"></i> Sign up with Google
          </button>
          
          <div className="switch-form">
            <p>Already have an account? <a href="#" onClick={() => setIsLogin(true)}>Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;