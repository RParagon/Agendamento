import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientForm />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
