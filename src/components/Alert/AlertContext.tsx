import React, { createContext, useContext, useMemo, useState } from 'react';
import { Alert } from '../../types/Alert';
import { AlertContainer } from './AlertContainer';

type AlertInput = Omit<Alert, 'id'>;

type AlertContextType = {
  alerts: Alert[];
  showAlert: (alert: AlertInput) => void;
  removeAlert: (id: number) => void;

  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
};

const AlertContext = createContext<AlertContextType | null>(null!);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const showAlert = ({ message, type = 'info', duration = 3000 }: AlertInput) => {
    const id = Date.now();

    setAlerts((prev) => [...prev, { id, message, type, duration }]);

    if (duration !== 0) {
      setTimeout(() => removeAlert(id), duration);
    }
  };

  const success = (message: string) => showAlert({ message, type: 'success' });
  const error = (message: string) => showAlert({ message, type: 'error' });
  const warning = (message: string) => showAlert({ message, type: 'warning' });
  const info = (message: string) => showAlert({ message, type: 'info' });

  const value = useMemo(
    () => ({
      alerts,
      showAlert,
      removeAlert,
      success,
      error,
      warning,
      info,
    }),
    [alerts],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertContainer alerts={alerts} onClose={removeAlert} />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error('useAlert deve ser usado dentro do AlertProvider');
  }

  return context;
};
