import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add staggered animation for hero stats
          if (entry.target.classList.contains('stat-item')) {
            const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.2}s`;
          }
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleInputBlur = (e) => {
    const { id, value } = e.target;
    
    // Validate individual field on blur
    if (value.trim()) {
      const errors = validateForm();
      setFormErrors(prev => ({
        ...prev,
        [id]: errors[id] || ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Scroll to first error
      const firstErrorField = document.querySelector('.error-field');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call with timeout
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          Math.random() > 0.2 ? resolve() : reject(new Error('Network error'));
        }, 2000);
      });
      
      setSubmitStatus({
        type: 'success',
        message: `Thank you, ${formData.name}! Your message has been sent successfully. We'll get back to you within 2 hours.`
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Clear errors
      setFormErrors({});

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly at info@ebidhub.com.'
      });
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  // Contact information data
  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Address',
      content: '123 Auction Avenue, Bidville<br />New York, NY 10001, USA',
      link: 'https://maps.google.com/?q=123+Auction+Avenue+New+York+NY+10001'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      content: '+1 (555) 123-4567<br />+1 (555) 987-6543',
      link: 'tel:+15551234567'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: 'info@ebidhub.com<br />support@ebidhub.com',
      link: 'mailto:info@ebidhub.com'
    },
    {
      icon: 'fas fa-clock',
      title: 'Business Hours',
      content: 'Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed'
    }
  ];

  const stats = [
    {
      icon: 'fas fa-clock',
      number: '24/7',
      label: 'Support Available'
    },
    {
      icon: 'fas fa-reply',
      number: '2 Hours',
      label: 'Avg Response Time'
    },
    {
      icon: 'fas fa-headset',
      number: '100%',
      label: 'Satisfaction Rate'
    }
  ];

  return (
    <div className="contact-page">
      {/* Animated Background Elements */}
      <div className="background-pattern"></div>
      <div className="premium-detail detail-1"></div>
      <div className="premium-detail detail-2"></div>
      <div className="premium-detail detail-3"></div>
      <div className="premium-detail detail-4"></div>
      
      <Header />

      {/* Enhanced Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="fade-in">Get In Touch With Us</h1>
          <p className="hero-subtitle fade-in">
            We're here to answer any questions you may have about our auction services. 
            Reach out to us and we'll respond as soon as we can.
          </p>
          
          {/* Statistics */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-item fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="stat-icon">
                  <i className={stat.icon}></i>
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="hero-cta">
            <div className="cta-buttons">
              <a href="tel:+15551234567" className="cta-primary">
                <i className="fas fa-phone"></i>
                Call Now
              </a>
              <a href="mailto:info@ebidhub.com" className="cta-secondary">
                <i className="fas fa-envelope"></i>
                Email Us
              </a>
              <a href="#contact-form" className="cta-secondary">
                <i className="fas fa-comment"></i>
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Content */}
      <main className="main-content">
        <div className="container">
          <h2 className="section-title fade-in">Contact Information</h2>
          
          <div className="contact-container">
            {/* Contact Information Side */}
            <div className="contact-info fade-in">
              <h2>Our Office</h2>
              
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className={`info-item ${info.link ? 'clickable' : ''}`}
                  onClick={() => info.link && window.open(info.link, '_blank')}
                >
                  <div className="info-icon">
                    <i className={info.icon}></i>
                  </div>
                  <div className="info-content">
                    <h3>{info.title}</h3>
                    <p dangerouslySetInnerHTML={{ __html: info.content }} />
                  </div>
                  {info.link && (
                    <div className="info-arrow">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Interactive Map */}
              <div className="map-container">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304613!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1654562366325!5m2!1sen!2s" 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EbidHub Office Location - New York, NY"
                ></iframe>
                <div className="map-overlay">
                  <button 
                    className="btn-map-directions"
                    onClick={() => window.open('https://maps.google.com/?q=New+York+NY', '_blank')}
                  >
                    <i className="fas fa-directions"></i>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="contact-form fade-in" id="contact-form">
              <h2>Send Us a Message</h2>
              
              {/* Status Message */}
              {submitStatus && (
                <div 
                  className={`status-message ${submitStatus.type} fade-in`}
                  role="alert"
                  aria-live="polite"
                >
                  <div className="status-icon">
                    <i className={`fas ${submitStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  </div>
                  <div className="status-content">
                    {submitStatus.message}
                  </div>
                  <button 
                    className="status-close"
                    onClick={() => setSubmitStatus(null)}
                    aria-label="Close notification"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}
              
              <form 
                ref={formRef}
                id="contactForm" 
                onSubmit={handleSubmit}
                noValidate
              >
                <div className={`form-group ${formErrors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">
                    Full Name *
                    {formErrors.name && (
                      <span className="error-message"> - {formErrors.name}</span>
                    )}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`form-control ${formErrors.name ? 'error-field' : ''}`}
                    placeholder="Your Full Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required 
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                </div>

                <div className={`form-group ${formErrors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">
                    Email Address *
                    {formErrors.email && (
                      <span className="error-message"> - {formErrors.email}</span>
                    )}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`form-control ${formErrors.email ? 'error-field' : ''}`}
                    placeholder="your.email@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required 
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                  />
                </div>

                <div className={`form-group ${formErrors.subject ? 'has-error' : ''}`}>
                  <label htmlFor="subject">
                    Subject *
                    {formErrors.subject && (
                      <span className="error-message"> - {formErrors.subject}</span>
                    )}
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    className={`form-control ${formErrors.subject ? 'error-field' : ''}`}
                    placeholder="What is this regarding?" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required 
                    aria-describedby={formErrors.subject ? "subject-error" : undefined}
                  />
                </div>

                <div className={`form-group ${formErrors.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">
                    Message *
                    {formErrors.message && (
                      <span className="error-message"> - {formErrors.message}</span>
                    )}
                  </label>
                  <textarea 
                    id="message" 
                    className={`form-control ${formErrors.message ? 'error-field' : ''}`}
                    placeholder="Please describe your inquiry in detail..." 
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                  ></textarea>
                  <div className="char-count">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`btn ${isSubmitting ? 'btn-loading' : ''}`}
                  disabled={!isFormValid || isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message <i className="fas fa-paper-plane"></i>
                    </>
                  )}
                </button>

                <div className="form-note">
                  <p>
                    <i className="fas fa-info-circle"></i>
                    Fields marked with * are required. We typically respond within 2 hours during business hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>EbidHub Auctions</h3>
              <p>Your trusted partner for premium auction experiences since 2015.</p>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Twitter" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="copyright">
              <p>&copy; 2024 EbidHub Auctions. All rights reserved.</p>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;