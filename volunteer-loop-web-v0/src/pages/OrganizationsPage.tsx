import { Link } from 'react-router-dom';
import './OrganizationsPage.css';

const OrganizationsPage = () => {
  const organizations = [
    {
      id: 1,
      name: "Green Thumbs Community",
      category: "Environment",
      location: "Downtown",
      description: "Dedicated to creating sustainable urban gardens and teaching environmental stewardship to the community.",
      volunteers: 45,
      opportunities: 8,
      rating: 4.8,
      image: "🌱"
    },
    {
      id: 2,
      name: "Hope Food Bank",
      category: "Hunger Relief",
      location: "Central District",
      description: "Providing food assistance to families in need and working to eliminate food insecurity in our community.",
      volunteers: 120,
      opportunities: 15,
      rating: 4.9,
      image: "🍎"
    },
    {
      id: 3,
      name: "Golden Years Center",
      category: "Elder Care",
      location: "North Side",
      description: "Supporting seniors through companionship programs, activities, and assistance with daily living needs.",
      volunteers: 78,
      opportunities: 12,
      rating: 4.7,
      image: "👴"
    },
    {
      id: 4,
      name: "Paws & Hearts Shelter",
      category: "Animal Welfare",
      location: "West Side",
      description: "Rescuing and caring for abandoned animals while finding them loving forever homes.",
      volunteers: 95,
      opportunities: 20,
      rating: 4.6,
      image: "🐕"
    },
    {
      id: 5,
      name: "City Public Library",
      category: "Education",
      location: "Downtown",
      description: "Promoting literacy and lifelong learning through community programs and educational resources.",
      volunteers: 60,
      opportunities: 10,
      rating: 4.8,
      image: "📚"
    },
    {
      id: 6,
      name: "Ocean Protectors",
      category: "Environment",
      location: "Coastal Area",
      description: "Protecting marine ecosystems through beach cleanups, education, and conservation initiatives.",
      volunteers: 35,
      opportunities: 6,
      rating: 4.5,
      image: "🌊"
    }
  ];

  return (
    <div className="organizations-page">
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
            <Link to="/organizations" className="nav-link active">Organizations</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-blue">Partner</span> <span className="title-yellow">Organizations</span>
          </h1>
          <p className="page-subtitle">
            Connect with verified organizations and discover how to get involved
          </p>
        </div>
      </section>

      {/* Organization Registration CTA */}
      <section className="registration-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Are you an organization looking for volunteers?</h2>
              <p>Join VolunteerLoop to connect with passionate volunteers and expand your impact in the community.</p>
              <button className="btn btn-primary">Register Your Organization</button>
            </div>
            <div className="cta-visual">
              <div className="cta-icon">🏢</div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations Grid */}
      <section className="organizations-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Organizations</h2>
            <p>Discover organizations making a difference in your community</p>
          </div>
          
          <div className="organizations-grid">
            {organizations.map((org) => (
              <div key={org.id} className="organization-card">
                <div className="org-header">
                  <div className="org-image">{org.image}</div>
                  <div className="org-info">
                    <h3 className="org-name">{org.name}</h3>
                    <span className="org-category">{org.category}</span>
                  </div>
                  <div className="org-rating">
                    <span className="rating-star">⭐</span>
                    <span className="rating-number">{org.rating}</span>
                  </div>
                </div>
                
                <p className="org-description">{org.description}</p>
                
                <div className="org-stats">
                  <div className="stat-item">
                    <span className="stat-icon">👥</span>
                    <span className="stat-label">Volunteers</span>
                    <span className="stat-value">{org.volunteers}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🎯</span>
                    <span className="stat-label">Opportunities</span>
                    <span className="stat-value">{org.opportunities}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📍</span>
                    <span className="stat-label">Location</span>
                    <span className="stat-value">{org.location}</span>
                  </div>
                </div>
                
                <div className="org-actions">
                  <button className="btn btn-secondary">View Profile</button>
                  <button className="btn btn-primary">Contact</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Partner with VolunteerLoop?</h2>
            <p>Join hundreds of organizations already making an impact</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon blue-icon">🔍</div>
              <h3>Easy Volunteer Discovery</h3>
              <p>Connect with volunteers who match your organization's needs and mission.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon yellow-icon">📱</div>
              <h3>Simple Management</h3>
              <p>Post opportunities, manage applications, and track volunteer engagement all in one place.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon blue-icon">✅</div>
              <h3>Verified Volunteers</h3>
              <p>Access a pool of pre-screened and committed volunteers ready to make a difference.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon yellow-icon">📊</div>
              <h3>Impact Tracking</h3>
              <p>Monitor your organization's impact and volunteer engagement with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrganizationsPage; 