import { IPatient } from '../types/Patient';
import { api } from './axios';

export const createPatient = async (patient: IPatient) => {
  const response = await api.post('/patients/create', patient);
  return response.data;
};

export const getPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

export const getPatientsByDoctorId = async () => {
  const response = await api.get('/patients/doctor');
  return response.data;
}

export const getPatientById = async (id: string) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const getFamilyByIndexId = async (indexId: string) => {
  const response = await api.get(`/patients/${indexId}/family`);
  return response.data;
}

export const updatePatient = async (id: string, patient: IPatient) => {
  const response = await api.put(`/patients/${id}`, patient);
  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};
