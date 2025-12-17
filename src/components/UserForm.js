import React, { useState } from 'react';
import Icons from './Icons';
import './UserForm.css';

const UserForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const { confirmPassword, ...userData } = formData;
    onSubmit(userData);
  };

  return (
    <div className="modal-overlay">
      <div className="user-form-modal">
        <button className="close-btn" onClick={onClose}>
          <Icons.Close />
        </button>
        <h2>Add New User</h2>
        
        <form onSubmit={handleSubmit} className="user-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Username *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
              minLength="3"
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
          </div>

          <div className="form-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password (min 6 characters)"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p className="role-description">
              {formData.role === 'admin' 
                ? 'Admin users can create, edit, and delete recipes.' 
                : 'Regular users can only view recipes.'}
            </p>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
