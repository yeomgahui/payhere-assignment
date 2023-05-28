import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SiteRegistration from './components/SiteRegistration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SiteRegistration />} />
        {/* <Route path="/detail/:id" component={DetailPage} /> */}
      </Routes>
    </Router>
  );
}

export default App;
