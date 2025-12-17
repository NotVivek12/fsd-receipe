import React, { useEffect } from 'react';
import Icons from './Icons';
import './ConfirmToast.css';

const ConfirmToast = ({ message, onConfirm, onCancel, duration = 10000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCancel();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onCancel]);

  return (
    <div className="confirm-toast">
      <div className="confirm-toast-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div className="confirm-toast-content">
        <div className="confirm-toast-message">{message}</div>
        <div className="confirm-toast-actions">
          <button className="confirm-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn-confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmToast;
