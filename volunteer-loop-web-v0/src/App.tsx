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

  return (
    <>
      {showRegistration ? (
        <RegistrationFlow onComplete={completeRegistration} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      )}
    </>
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
