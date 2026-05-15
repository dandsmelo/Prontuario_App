import {
  createPatientRequest,
  deletePatientRequest,
  getFamilyByIndexIdRequest,
  getPatientByIdRequest,
  getPatientsByDoctorIdRequest,
  getPatientsRequest,
  updatePatientRequest,
} from '../api/patient.requests';
import { useAlert } from '../components/Alert';
import { ApiError } from '../types/ApiError';
import { IPatient } from '../types/Patient';

export const usePatient = () => {
  const { error: showError } = useAlert();

  const createPatient = async (patient: IPatient) => {
    try {
      const response = await createPatientRequest(patient);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const getPatients = async () => {
    try {
      const response = await getPatientsRequest();
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const getPatientsByDoctorId = async () => {
    try {
      const response = await getPatientsByDoctorIdRequest();
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const getPatientById = async (id: string) => {
    try {
      const response = await getPatientByIdRequest(id);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const getFamilyByIndexId = async (indexId: string) => {
    try {
      const response = await getFamilyByIndexIdRequest(indexId);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const updatePatient = async (id: string, patient: IPatient) => {
    try {
      const response = await updatePatientRequest(id, patient);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const deletePatient = async (id: string) => {
    try {
      const response = await deletePatientRequest(id);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  return {
    createPatient,
    getPatients,
    getPatientsByDoctorId,
    getPatientById,
    getFamilyByIndexId,
    updatePatient,
    deletePatient,
  };
};
