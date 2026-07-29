import { format } from 'date-fns';
import Button from '../../../../components/Button/Button';
import { IAttendance } from '../../../../types/Attendance';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  attendance: IAttendance;
}

export default function AttendanceCard(props: Props) {
  const { attendance } = props;
  const navigate = useNavigate();

  const viewAttendance = (patientId: string, attendanceId: string) => {
    navigate(`/attendance/${patientId}/view/${attendanceId}`);
  };

  return (
    <div className="card-container">
      <h4 className="card-title">{attendance.diagnosis}</h4>
      <hr />
      <div className="card-section">
        <div className="card-date">
          <span>Data</span>
          <span>{format(new Date(attendance.date), 'dd/MM/yyyy')}</span>
        </div>
        <div className="card-time">
          <span>Horário</span>
          <span>{format(new Date(attendance.date), 'HH:mm')}</span>
        </div>
      </div>
      <div className="card-button-section">
        <Button className="card-button" width="135px">
          Gerar relatório
        </Button>
        <Button
          className="card-button"
          width="90px"
          onClick={() => viewAttendance(attendance.patientId, attendance._id!)}
        >
          Abrir
        </Button>
      </div>
    </div>
  );
}
