import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SiteRegistration from './components/SiteRegistration';
import SiteDetailPage from './views/SiteDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SiteRegistration />} />
        <Route path="/detail/:id" element={<SiteDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
