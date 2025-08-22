import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from '../components/LoginButton';
import './HomePage.css';

const HomePage = () => {
  const { user, volunteerLoopUser, isRegistered } = useAuth();

  return (
    <div className="homepage">
      {/* Navigation Header */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="logo-text">
              <span className="logo-volunteer">Volunteer</span>Loop
            </Link>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/opportunities" className="nav-link">Find Opportunities</Link>
            <Link to="/organizations" className="nav-link">Organizations</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
          <div className="nav-auth">
            <LoginButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-blue">Connect with</span>
              <span className="title-yellow">Meaningful</span>
              <span className="title-blue">Opportunities</span>
            </h1>
            <p className="hero-description">
              Join VolunteerLoop and discover volunteer opportunities that match your skills, 
              interests, and schedule. Make a difference in your community while building meaningful connections.
            </p>
            
            {!user ? (
              <div className="hero-buttons">
                <Link to="/opportunities" className="btn btn-primary">Find Opportunities</Link>
                <Link to="/organizations" className="btn btn-secondary">Join as Organization</Link>
              </div>
            ) : (
              <div className="hero-buttons">
                {volunteerLoopUser?.role === 'volunteer' ? (
                  <Link to="/opportunities" className="btn btn-primary">Find Opportunities</Link>
                ) : (
                  <Link to="/organizations" className="btn btn-primary">Manage Organization</Link>
                )}
                <Link to="/about" className="btn btn-secondary">Learn More</Link>
              </div>
            )}
          </div>
          <div className="hero-visual">
            <div className="hero-circle"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-header">
            <h2 className="section-title">Why Choose VolunteerLoop?</h2>
            <p className="section-subtitle">
              Our platform makes it easy to find and participate in volunteer opportunities that matter to you.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue-icon">🔍</div>
              <h3>Smart Matching</h3>
              <p>Our AI-powered system matches you with opportunities based on your skills, location, and interests.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon yellow-icon">⏰</div>
              <h3>Flexible Scheduling</h3>
              <p>Find opportunities that fit your schedule, whether you have an hour or a whole day to give.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon blue-icon">👥</div>
              <h3>Community Building</h3>
              <p>Connect with like-minded volunteers and build lasting relationships in your community.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon yellow-icon">✅</div>
              <h3>Verified Organizations</h3>
              <p>All organizations are verified and vetted to ensure safe and meaningful volunteer experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to make a difference?</h2>
          <p className="cta-subtitle">
            Start your volunteer journey today and join thousands of volunteers who are already making an impact.
          </p>
          {!user ? (
            <Link to="/opportunities" className="btn btn-cta">Get Started</Link>
          ) : (
            <Link to="/opportunities" className="btn btn-cta">Find Opportunities</Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-logo">
                <span className="logo-blue">Volunteer</span>Loop
              </h3>
              <p>Connecting volunteers with meaningful opportunities to make a difference in communities worldwide.</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Platform</h4>
                <ul>
                  <li><Link to="/opportunities">Find Opportunities</Link></li>
                  <li><Link to="/organizations">Organizations</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Support</h4>
                <ul>
                  <li><a href="#">Contact</a></li>
                  <li><a href="#">Help Center</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 VolunteerLoop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 