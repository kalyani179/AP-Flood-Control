import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DetailsPage from './components/DetailsPage';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <Router>
      <div className=''>
        <Routes>
          {/* Define the default route for Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Define the route for the DetailsPage */}
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
