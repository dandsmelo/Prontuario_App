import { IDoctor } from '../types/Doctor';
import { api } from './axios';

export const createDoctorRequest = async (doctor: IDoctor) => {
  const response = await api.post(`/doctors/register`, doctor);
  return response.data;
};

export const loginDoctorRequest = async (email: string, password: string) => {
  const response = await api.post(`/doctors/login`, { email, password });
  return response;
};
