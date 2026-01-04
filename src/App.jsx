import { useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import Protected from './components/Protected.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './components/NotFound.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <Protected>
            <Dashboard />
          </Protected>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes> 
    </>
  )
}

export default App
