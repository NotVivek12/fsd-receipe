import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Icons from './Icons';
import './AdminLogin.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(credentials);
      
      // Check if user is admin
      if (result.user.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        setLoading(false);
        return;
      }
      
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-header">
          <div className="admin-icon">
            <Icons.Lock />
          </div>
          <h2>Admin Login</h2>
          <p>Access restricted to authorized administrators only</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          
          <button type="submit" className="btn-admin-login" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login as Admin'}
          </button>
        </form>
        
        <div className="admin-footer">
          <button onClick={() => navigate('/')} className="btn-back-home">
            <Icons.ArrowLeft />
            <span>Back to Recipes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
