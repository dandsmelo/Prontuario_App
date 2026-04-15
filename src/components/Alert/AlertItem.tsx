import { useEffect, useState } from 'react';
import { Alert } from '../../types/Alert';

interface Props {
  alert: Alert;
  onClose: (id: number) => void;
}

const getColor = (type: string) => {
  switch (type) {
    case 'success':
      return '#4caf50';
    case 'error':
      return '#f44336';
    case 'warning':
      return '#ff9800';
    default:
      return '#2196f3';
  }
};

export const AlertItem = ({ alert, onClose }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(alert.id), 300);
  };

  return (
    <div
      style={{
        minWidth: 250,
        padding: '12px 16px',
        borderRadius: 8,
        backgroundColor: getColor(alert.type),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transform: visible ? 'translateX(0)' : 'translateX(120%)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s ease',
      }}
    >
      <span style={{ color: '#fff' }}>{alert.message}</span>

      <button
        onClick={handleClose}
        style={{
          marginLeft: 10,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        ✕
      </button>
    </div>
  );
};
