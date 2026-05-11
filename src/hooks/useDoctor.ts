import { createDoctorRequest, loginDoctorRequest } from '../api/doctor.requests';
import { useAlert } from '../components/Alert';
import { ApiError } from '../types/ApiError';
import { IDoctor } from '../types/Doctor';
import { useAuth } from './useAuth';

export const useDoctor = () => {
  const { error: showError } = useAlert();
  const { login } = useAuth();

  const createDoctor = async (doctor: IDoctor) => {
    try {
      const response = await createDoctorRequest(doctor);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const loginDoctor = async (email: string, password: string) => {
    try {
      const response = await loginDoctorRequest(email, password);
      if (response.status === 200) {
        login(response.data.token);
        return response.data;
      }
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  return {
    createDoctor,
    loginDoctor,
  };
};
