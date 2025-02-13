import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<ClientForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
