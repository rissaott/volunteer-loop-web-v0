import { Link } from 'react-router-dom';
import './OpportunitiesPage.css';

const OpportunitiesPage = () => {
  const opportunities = [
    {
      id: 1,
      title: "Community Garden Volunteer",
      organization: "Green Thumbs Community",
      location: "Downtown Park",
      date: "Every Saturday",
      time: "9:00 AM - 12:00 PM",
      category: "Environment",
      description: "Help maintain our community garden, plant vegetables, and teach children about sustainable gardening practices.",
      skills: ["Gardening", "Teaching", "Physical Activity"]
    },
    {
      id: 2,
      title: "Food Bank Assistant",
      organization: "Hope Food Bank",
      location: "123 Main Street",
      date: "Weekdays",
      time: "10:00 AM - 2:00 PM",
      category: "Hunger Relief",
      description: "Sort and package food donations, assist with distribution, and help organize inventory.",
      skills: ["Organization", "Customer Service", "Physical Activity"]
    },
    {
      id: 3,
      title: "Senior Companion",
      organization: "Golden Years Center",
      location: "456 Elder Lane",
      date: "Flexible",
      time: "2:00 PM - 4:00 PM",
      category: "Elder Care",
      description: "Provide companionship to seniors, read books, play games, and assist with light activities.",
      skills: ["Patience", "Communication", "Empathy"]
    },
    {
      id: 4,
      title: "Animal Shelter Helper",
      organization: "Paws & Hearts Shelter",
      location: "789 Pet Avenue",
      date: "Weekends",
      time: "11:00 AM - 3:00 PM",
      category: "Animal Welfare",
      description: "Walk dogs, socialize cats, clean kennels, and assist with adoption events.",
      skills: ["Animal Care", "Physical Activity", "Patience"]
    },
    {
      id: 5,
      title: "Library Reading Buddy",
      organization: "City Public Library",
      location: "321 Book Street",
      date: "Tuesdays & Thursdays",
      time: "4:00 PM - 6:00 PM",
      category: "Education",
      description: "Read stories to children, help with homework, and promote literacy in the community.",
      skills: ["Reading", "Teaching", "Patience"]
    },
    {
      id: 6,
      title: "Beach Cleanup Coordinator",
      organization: "Ocean Protectors",
      location: "Sunset Beach",
      date: "Monthly",
      time: "8:00 AM - 11:00 AM",
      category: "Environment",
      description: "Organize beach cleanup events, coordinate volunteers, and educate about marine conservation.",
      skills: ["Leadership", "Organization", "Environmental Awareness"]
    }
  ];

  return (
    <div className="opportunities-page">
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
            <Link to="/opportunities" className="nav-link active">Find Opportunities</Link>
            <Link to="/organizations" className="nav-link">Organizations</Link>
            <Link to="/about" className="nav-link">About</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">
            <span className="title-blue">Find Volunteer</span> <span className="title-yellow">Opportunities</span>
          </h1>
          <p className="page-subtitle">
            Discover meaningful ways to give back to your community
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search opportunities..." 
                className="search-input"
              />
              <button className="search-btn">🔍</button>
            </div>
            <div className="filter-options">
              <select className="filter-select">
                <option value="">All Categories</option>
                <option value="environment">Environment</option>
                <option value="education">Education</option>
                <option value="hunger">Hunger Relief</option>
                <option value="elder-care">Elder Care</option>
                <option value="animals">Animal Welfare</option>
              </select>
              <select className="filter-select">
                <option value="">All Locations</option>
                <option value="downtown">Downtown</option>
                <option value="north">North Side</option>
                <option value="south">South Side</option>
                <option value="east">East Side</option>
                <option value="west">West Side</option>
              </select>
              <select className="filter-select">
                <option value="">All Times</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="weekend">Weekend</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="opportunities-section">
        <div className="container">
          <div className="opportunities-grid">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="opportunity-card">
                <div className="opportunity-header">
                  <h3 className="opportunity-title">{opportunity.title}</h3>
                  <span className="opportunity-category">{opportunity.category}</span>
                </div>
                <div className="opportunity-organization">
                  <strong>{opportunity.organization}</strong>
                </div>
                <div className="opportunity-details">
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{opportunity.location}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{opportunity.date}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">⏰</span>
                    <span>{opportunity.time}</span>
                  </div>
                </div>
                <p className="opportunity-description">{opportunity.description}</p>
                <div className="opportunity-skills">
                  {opportunity.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <button className="btn btn-primary opportunity-btn">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OpportunitiesPage; 