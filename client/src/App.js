import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import DetailsPage from './components/Details/DetailsPage';
import Footer from './components/Footer/Footer';
import Map from './components/Dashboard/Map';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define the default route for Dashboard */}
          {/* <Route path="/" element={<Dashboard />} /> */}
          
          {/* Define the route for the DetailsPage */}
          {/* <Route path="/details" element={<DetailsPage />} /> */}
          <Route path="/" element={<Map />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
