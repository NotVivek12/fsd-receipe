import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const addRecipeRef = useRef(null);

  const handleAddRecipeClick = () => {
    if (addRecipeRef.current) {
      addRecipeRef.current();
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar onAddRecipeClick={handleAddRecipeClick} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={<AdminDashboard onAddRecipeClick={addRecipeRef} />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
