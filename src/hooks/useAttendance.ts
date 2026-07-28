import {
  createAttendanceRequest,
  listAttendancesRequest,
  getAttendanceByIdRequest,
  listAttendancesByPatientIdRequest,
} from '../api/attendance.requests';
import { useAlert } from '../components/Alert';
import { ApiError } from '../types/ApiError';
import { IAttendance } from '../types/Attendance';

export const useAttendance = () => {
  const { error: showError } = useAlert();

  const createAttendance = async (attendance: IAttendance) => {
    try {
      const response = await createAttendanceRequest(attendance);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const listAttendances = async () => {
    try {
      const response = await listAttendancesRequest();
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const getAttendanceById = async (id: string) => {
    try {
      const response = await getAttendanceByIdRequest(id);
      return response;
    } catch (err) {
      const error = err as ApiError;
      showError(error.customMessage);
      return null;
    }
  };

  const listAttendancesByPatientId = async (patientId: string) => {
    try {
      const response = await listAttendancesByPatientIdRequest(patientId);
      return response;
    } catch (err) {
      const error = err as ApiError;

      if (error.customMessage === 'Nenhum atendimento encontrado.') {
        return [];
      }
      showError(error.customMessage);
      return null;
    }
  };

  return {
    createAttendance,
    listAttendances,
    getAttendanceById,
    listAttendancesByPatientId,
  };
};
