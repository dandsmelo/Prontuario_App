import { IDoctor } from '../types/Doctor';
import { api } from './axios';

export const createDoctor = async (doutor: IDoctor) => {
  const response = await api.post(`/doctors/register`, doutor);
  return response.data;
}

export const loginDoctor = async (email: string, password: string) => {
  const response = await api.post(`/doctors/login`, { email, password });
  return response;
}