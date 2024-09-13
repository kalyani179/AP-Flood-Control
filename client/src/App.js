import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DetailsPage from './components/DetailsPage';

const App = () => {
  return (
    <Router>
      <div className="p-5">
        <Routes>
          {/* Define the default route for Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Define the route for the DetailsPage */}
          <Route path="/details" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
