import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Navigation Header */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="logo-text">
              <span className="logo-volunteer">Volunteer</span>Loop
            </Link>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/opportunities" className="nav-link">Find Opportunities</Link>
            <Link to="/organizations" className="nav-link">Organizations</Link>
            <Link to="/about" className="nav-link active">About</Link>
          </div>
        </div>
      </nav>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <h1 className="page-title">Our Mission</h1>
          <p className="mission-text">
            To eliminate the barriers between people who want to help and the causes that need them. 
            We believe that when we make volunteering simple, accessible, and meaningful, everyone wins.
          </p>
          <p className="mission-subtitle">
            VolunteerLoop is a fresh take on volunteer matching—a simple, mobile-first app that helps 
            people find causes they care about in minutes.
          </p>
        </div>
      </section>

      {/* Founders Section */}
      <section className="founders-section">
        <div className="container">
          <h2>Founders</h2>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-avatar">👨‍💼</div>
              <h3>Stephen Barrett</h3>
              <p className="founder-title">CEO & Founder</p>
              <p className="founder-bio">
                Former nonprofit executive with 15+ years experience in community development. 
                Passionate about leveraging technology to solve social challenges.
                ** editable **
              </p>
            </div>
            
            <div className="founder-card">
              <div className="founder-avatar">👩‍💻</div>
              <h3>Sarah Johnson</h3>
              <p className="founder-title">CTO & Co-Founder</p>
              <p className="founder-bio">
                Tech veteran with expertise in mobile app development and user experience design. 
                Believes great technology should make doing good effortless.
              </p>
            </div>
            
            <div className="founder-card">
              <div className="founder-avatar">👨‍🎓</div>
              <h3>Mike Chen</h3>
              <p className="founder-title">COO & Co-Founder</p>
              <p className="founder-bio">
                Operations specialist with deep roots in volunteer management. 
                Dedicated to building scalable systems that serve communities effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <Link to="/opportunities" className="btn btn-primary">Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 