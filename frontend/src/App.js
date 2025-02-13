import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClientForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
