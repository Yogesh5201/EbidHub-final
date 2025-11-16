import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize particles.js
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 30, density: { enable: true, value_area: 800 } },
          color: { value: "#c9a86d" },
          opacity: { value: 0.5, random: true },
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
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          }
        },
        retina_detect: true
      });
    }

    // Add scroll animation to categories
    const categories = document.querySelectorAll('.category');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    categories.forEach(category => {
      category.style.opacity = 0;
      category.style.transform = 'translateY(50px)';
      category.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(category);
    });

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleReturn = () => {
    navigate('/');
  };

  const categories = [
    {
      id: 1,
      title: "Cars",
      image: "CARS.jpg",
      description: "Discover a wide range of luxury cars from around the world. Whether you're looking for a classic vintage or the latest sports model, we have something for every car enthusiast.",
      link: "/cars"
    },
    {
      id: 2,
      title: "Motorcycles",
      image: "BIKES.jpg",
      description: "Browse through our collection of high-performance motorcycles, including iconic models from Harley-Davidson, Ducati, and more. Find your next ride today!",
      link: "/bikes"
    },
    {
      id: 3,
      title: "Watches",
      image: "WATCHES.jpg",
      description: "From timeless classics to modern masterpieces, our auction offers a variety of watches to suit all tastes. Bid on luxury brands like Rolex, Patek Philippe, and others.",
      link: "/not-available"
    },
    {
      id: 4,
      title: "Guns",
      image: "IRON.jpg",
      description: "Unveil a collection of legendary firearms that have defined history. From vintage revolvers to rare collectible rifles, each piece is a testament to superior craftsmanship, precision engineering, and an unrelenting pursuit of perfection.",
      link: "/not-available"
    },
    {
      id: 5,
      title: "Jewellery",
      image: "image.jpg",
      description: "Indulge in our exclusive selection of opulent jewelry, where each piece tells a story of elegance and grandeur. From intricately designed necklaces to radiant diamond rings, celebrate the beauty of timeless luxury and sophistication.",
      link: "/jewellery"
    },
    {
      id: 6,
      title: "Paintings",
      image: "MONAJI.jpg",
      description: "Step into a realm of artistic wonder and cultural heritage. From Renaissance masterpieces to contemporary marvels, discover captivating paintings that evoke emotion, inspire imagination, and celebrate the visionary spirit of world-renowned artists.",
      link: "/not-available"
    }
  ];

  const CategoryCard = ({ category }) => {
    const handleImageError = (e) => {
      // Use a local fallback or a reliable placeholder service
      e.target.src = `/images/fallback-${category.title.toLowerCase()}.jpg`;

      // If local image also fails, use a data URL as final fallback
      e.target.onerror = () => {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTUxNTE1Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2M5YTg2ZCIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIj4KICAgIDwvdGV4dD4KPC9zdmc+';
      };
    };

    return (
      <div
        className="category-card"
        onClick={() => navigate(category.link)}
      >
        <div className="category-image-container">
          <img
            src={`/images/${category.image}`}
            alt={category.title}
            className="category-image"
            onError={handleImageError}
          />
          <div className="image-overlay"></div>
        </div>
        <div className="category-content">
          <h2>{category.title}</h2>
          <p>{category.description}</p>
        </div>
        <div className="category-hover-effect"></div>
      </div>
    );
  };

  return (
    <div className="menu-page">
      {/* Video Background */}
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source 
            src="https://v.ftcdn.net/04/96/92/18/700_F_496921832_IHB3G81eZd3j4gjhJBjzMX1W1EtnSxyO_ST.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="video-overlay"></div>
      </div>
      
      {/* Particles Container */}
      <div className="particles-container" id="particles-js"></div>
      
      <Header />
      
      <div className="categories-container">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      <div className="collectors-section">
        <h2>A Go-to place for all Antique collectors Worldwide</h2>
      </div>
      
      <div className="return-link">
        <button className="return-btn" onClick={handleReturn}>
          Return to Home
        </button>
      </div>
      
      <footer className="menu-footer">
        <p>&copy; 2024 EbidHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Menu;