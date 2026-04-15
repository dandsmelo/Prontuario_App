export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: number;
  message: string;
  type: AlertType;
  duration?: number;
}
