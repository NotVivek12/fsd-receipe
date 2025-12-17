import { useState, useCallback } from 'react';

export const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const [confirmToast, setConfirmToast] = useState(null);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const hideToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showConfirm = useCallback((message, onConfirm) => {
    return new Promise((resolve) => {
      setConfirmToast({
        message,
        onConfirm: () => {
          setConfirmToast(null);
          onConfirm();
          resolve(true);
        },
        onCancel: () => {
          setConfirmToast(null);
          resolve(false);
        },
      });
    });
  }, []);

  const hideConfirm = useCallback(() => {
    setConfirmToast(null);
  }, []);

  return { toasts, showToast, hideToast, confirmToast, showConfirm, hideConfirm };
};
