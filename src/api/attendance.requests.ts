import { IAttendance } from '../types/Attendance';
import { api } from './axios';

export const createAttendanceRequest = async (attendance: IAttendance) => {
  const response = await api.post('/attendances/create', attendance);
  return response.data;
};

export const listAttendancesRequest = async (sortBy?: string, order?: 'asc' | 'desc') => {
  const response = await api.get('/attendances', {
    params: { sortBy, order },
  });
  return response.data;
};

export const getAttendanceByIdRequest = async (id: string) => {
  const response = await api.get(`/attendances/${id}`);
  return response.data;
};

export const listAttendancesByPatientIdRequest = async (patientId: string) => {
  const response = await api.get(`/attendances/patient/${patientId}`);
  return response.data;
};

export const generateAttendanceReportRequest = async (id: string) => {
  const response = await api.get(`/attendances/${id}/report`, {
    responseType: 'blob',
  });
  return response.data;
};
