import { Alert } from '../../types/Alert';
import { AlertItem } from './AlertItem';

interface Props {
  alerts: Alert[];
  onClose: (id: number) => void;
}

export const AlertContainer = ({ alerts, onClose }: Props) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 9999,
      }}
    >
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} onClose={onClose} />
      ))}
    </div>
  );
};
