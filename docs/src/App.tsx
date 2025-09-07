import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RegistrationFlow from './components/RegistrationFlow';
import HomePage from './pages/HomePage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import OrganizationsPage from './pages/OrganizationsPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const AppContent = () => {
  const { showRegistration, completeRegistration, user, loading } = useAuth();

  console.log('AppContent render:', { showRegistration, user: user?.id, loading });

  // Show loading state during authentication to prevent flicker
  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show registration flow immediately if needed
  if (showRegistration) {
    return <RegistrationFlow onComplete={completeRegistration} />;
  }

  // Only show routes when user is fully authenticated and registered
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/opportunities" element={<OpportunitiesPage />} />
      <Route path="/organizations" element={<OrganizationsPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
