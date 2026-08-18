import TopBar from '../../components/TopBar/TopBar';
import '../../assets/css/attendanceList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../../hooks/useAttendance';
import { IAttendance } from '../../types/Attendance';
import moment from 'moment';
import { usePatient } from '../../hooks/usePatient';
import { IPatient } from '../../types/Patient';
import { GoSortAsc } from 'react-icons/go';
import { GoSortDesc } from 'react-icons/go';
import Button from '../../components/Button/Button';

const AttendanceList: React.FC = () => {
  const [attendances, setAttendances] = useState<IAttendance[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [sortField, setSortField] = useState<string>();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { listAttendances } = useAttendance();
  const { getPatientById } = usePatient();

  const navigate = useNavigate();

  const handleRowClick = (patientId: string, id: string) => {
    navigate(`/attendance/${patientId}/view/${id}`);
  };

  const getPatientsByIds = async (ids: string[]) => {
    const response = await Promise.all(ids.map((id) => getPatientById(id)));
    setPatients(response as IPatient[]);
  };

  const getPatientName = (patientId: string) => {
    return patients.find((p) => p._id === patientId)?.name ?? '-';
  };

  const handleChangeSortField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

  const searchOptions = [
    { label: 'Data', value: 'date' },
    { label: 'Paciente', value: 'patientName' },
  ];

  const handleSort = () => {
    setSortOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'));
  };

  const renderOrderIcon = () => {
    if (sortOrder === 'asc') {
      return <GoSortAsc className="attendance-order-icon" />;
    }
    return <GoSortDesc className="attendance-order-icon" />;
  };

  useEffect(() => {
    async function fetchAttendance() {
      const data: IAttendance[] = await listAttendances(sortField, sortOrder);
      setAttendances(data);

      const patientIds = [...new Set(data.map((attendance) => attendance.patientId))];
      await getPatientsByIds(patientIds);
    }
    fetchAttendance();
  }, [sortField, sortOrder]);

  return (
    <>
      <TopBar />
      <div className="attendance-list-container">
        <h1 className="attendance-list-title">Atendimentos</h1>
        <div className="sort-attendances-container">
          <div className="search-attendance-container">
            Ordenar por
            <select
              name={sortField}
              onChange={handleChangeSortField}
              className="search-attendance-select"
            >
              {searchOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            type="button"
            onClick={handleSort}
            width="40px"
            className="attendance-order-button"
          >
            {renderOrderIcon()}
          </Button>
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
