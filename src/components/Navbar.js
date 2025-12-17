import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Icons from './Icons';
import './Navbar.css';

const Navbar = ({ onAddRecipeClick }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <Icons.Recipe />
          <h1>Recipe Share</h1>
        </div>
        <div className="nav-links">
          {isAdminPage && user && isAdmin() ? (
            <>
              <span className="welcome-text">
                Welcome, {user.username} (Admin)
              </span>
              <button className="btn-add" onClick={onAddRecipeClick}>
                <Icons.Plus />
                <span>Add Recipe</span>
              </button>
              <button className="btn-logout" onClick={logout}>
                <Icons.LogOut />
                <span>Logout</span>
              </button>
            </>
          ) : isAdminPage && !user ? (
            <span className="welcome-text">Admin Panel</span>
          ) : (
            <span className="welcome-text">Browse delicious recipes</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
