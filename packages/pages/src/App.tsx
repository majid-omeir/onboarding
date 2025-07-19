import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AccountCreation from './pages/AccountCreation';
import ProfileSetup from './pages/ProfileSetup';
import FeatureTour from './pages/FeatureTour';
import Signature from './pages/Signature';
import Feedback from './pages/Feedback';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        {/* Onboarding Flow with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/account" replace />} />
          <Route path="account" element={<AccountCreation />} />
          <Route path="profile" element={<ProfileSetup />} />
          <Route path="tour" element={<FeatureTour />} />
          <Route path="signature" element={<Signature />} />
        </Route>
        
        {/* Feedback Modal (without layout) */}
        <Route path="/feedback" element={<Feedback />} />
        
        {/* Welcome Page (without layout) */}
        <Route path="/welcome" element={<Welcome />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/account" replace />} />
      </Routes>
    </Router>
  );
}

export default App;