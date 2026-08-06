import TopBar from '../../components/TopBar/TopBar';
import '../../assets/css/attendanceList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAttendance } from '../../hooks/useAttendance';
import { IAttendance } from '../../types/Attendance';
import moment from 'moment';
import { usePatient } from '../../hooks/usePatient';
import { IPatient } from '../../types/Patient';

const AttendanceList: React.FC = () => {
  const [attendances, setAttendances] = useState<IAttendance[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [search, setSearch] = useState('');
  const { listAttendances } = useAttendance();
  const { getPatientById } = usePatient();

  const navigate = useNavigate();

  const handleRowClick = (patientId: string, id: string) => {
    navigate(`/attendance/${patientId}/view/${id}`);
  };

  const handleSearchPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPatientsByIds = async (ids: string[]) => {
    const response = await Promise.all(ids.map((id) => getPatientById(id)));
    setPatients(response as IPatient[]);
  };

  const getPatientName = (patientId: string) => {
    return patients.find((p) => p._id === patientId)?.name ?? '-';
  };

  useEffect(() => {
    async function fetchAttendance() {
      const data: IAttendance[] = await listAttendances();
      setAttendances(data);

      const patientIds = [...new Set(data.map((attendance) => attendance.patientId))];
      await getPatientsByIds(patientIds);
    }
    fetchAttendance();
  }, []);

  return (
    <>
      <TopBar />
      <div className="attendance-list-container">
        <h1 className="attendance-list-title">Atendimentos</h1>
        <div className="search-attendances-container">
          <div className="search-attendances">
            <FiSearch className="search-attendance-icon" />
            <input
              className="search-attendance-input"
              placeholder="Buscar a partir do nome do paciente"
              value={search}
              onChange={handleSearchPatient}
            />
          </div>
        </div>
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr className="attendances-table-header">
                <th className="attendances-table-th">Paciente</th>
                <th className="attendances-table-th">Diagnóstico</th>
                <th className="attendances-table-th">Data</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr
                  key={attendance._id}
                  className="attendances-table-tr"
                  onClick={() => handleRowClick(attendance.patientId, attendance._id!)}
                >
                  <td className="attendances-table-td">{getPatientName(attendance.patientId)}</td>
                  <td className="attendances-table-td">{attendance.diagnosis}</td>
                  <td className="attendances-table-td">
                    {moment(attendance.date).format('DD/MM/yyyy | HH:mm')}
                  </td>
                </tr>
              ))}
              <tr className="attendances-table-footer" />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AttendanceList;
