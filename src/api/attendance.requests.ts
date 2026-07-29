import { IAttendance } from '../types/Attendance';
import { api } from './axios';

export const createAttendanceRequest = async (attendance: IAttendance) => {
  const response = await api.post('/attendances/create', attendance);
  return response.data;
};

export const listAttendancesRequest = async () => {
  const response = await api.get('/attendances');
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
