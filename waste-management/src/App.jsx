import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoutes from './router/AdminRoutes';

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;