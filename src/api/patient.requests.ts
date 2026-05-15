import { IPatient } from '../types/Patient';
import { api } from './axios';

export const createPatientRequest = async (patient: IPatient) => {
  const response = await api.post('/patients/create', patient);
  return response.data;
};

export const getPatientsRequest = async () => {
  const response = await api.get('/patients');
  return response.data;
};

export const getPatientsByDoctorIdRequest = async () => {
  const response = await api.get('/patients/doctor');
  return response.data;
};

export const getPatientByIdRequest = async (id: string) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const getFamilyByIndexIdRequest = async (indexId: string) => {
  const response = await api.get(`/patients/${indexId}/family`);
  return response.data;
};

export const updatePatientRequest = async (id: string, patient: IPatient) => {
  const response = await api.put(`/patients/${id}`, patient);
  return response.data;
};

export const deletePatientRequest = async (id: string) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};
