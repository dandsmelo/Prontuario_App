import React, { useEffect, useState } from 'react';
import '../../assets/css/attendance.css';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../../components/TopBar/TopBar';
import { IoIosArrowDropleft } from 'react-icons/io';
import TitleSession from '../../components/TitleSession/titleSession';
import { IAttendance } from '../../types/Attendance';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { IPatient } from '../../types/Patient';
import { usePatient } from '../../hooks/usePatient';
import { differenceInYears } from 'date-fns';
import { useAttendance } from '../../hooks/useAttendance';
import { useAlert } from '../../components/Alert';

const Attendance: React.FC = () => {
  const navigate = useNavigate();
  const { patientId, id } = useParams();
  const { getPatientById } = usePatient();
  const { createAttendance, getAttendanceById } = useAttendance();
  const { success } = useAlert();
  const [patient, setPatient] = useState<IPatient>();
  const [attendance, setAttendance] = useState<IAttendance>({
    _id: '',
    patientId: '',
    doctorId: '',
    date: '',
    anamnesis: '',
    diagnosis: '',
    conduct: '',
    prescription: '',
    observations: '',
  });

  const isView = !!id;

  const getPatient = async () => {
    if (!patientId) return;

    const response = await getPatientById(patientId);
    setPatient(response);
  };

  const getAttendance = async () => {
    if (!id) return;

    const response = await getAttendanceById(id);
    setAttendance(response);
  };

  const translateCaseType = (caseType?: string) => {
    if (caseType == 'Family') {
      return 'Familiar';
    }
    return 'Índice';
  };

  const calculateAge = (birthDate: string): string => {
    return `${differenceInYears(new Date(), new Date(birthDate))} anos`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const saveAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;

    const date = new Date();

    await createAttendance({ ...attendance, patientId, date: date.toISOString() });
    success('Atendimento registrado com sucesso!');
    navigate(`/patient/${patientId}`);
  };

  const handleReturnPage = () => {
    navigate(`/patient/${patientId}`);
  };

  useEffect(() => {
    if (patientId) {
      getPatient();
    }

    if (id) {
      getAttendance();
    }
  }, [patientId, id]);

  if (!patient) {
    return null;
  }

  return (
    <>
      <TopBar />
      <IoIosArrowDropleft
        className="btn-back-page"
        title="Voltar a página anterior"
        onClick={handleReturnPage}
      />
      <div className="attendance-container">
        <h1 className="attendance-header">Atendimento</h1>
        <TitleSession title="Dados do paciente" width="175px" />
        <div className="attendance-input-section">
          <Input labelText="Nome" type="text" value={patient?.name} isDisabled />
          <Input
            labelText="Caso"
            type="text"
            value={translateCaseType(patient?.caseType)}
            isDisabled
          />
        </div>
        <div className="attendance-input-section">
          <Input labelText="Sexo" type="text" value={patient?.sex} isDisabled />
          <Input labelText="Idade" type="text" value={calculateAge(patient.birthDate)} isDisabled />
        </div>
        <TitleSession title="Relatório" width="95px" />

        <form onSubmit={saveAttendance}>
          <Input
            labelText="Anamnese"
            type="text"
            name="anamnesis"
            value={attendance?.anamnesis ?? ''}
            onChange={handleChange}
            isDisabled={isView}
          />
          <Input
            labelText="Diagnóstico"
            type="text"
            name="diagnosis"
            value={attendance?.diagnosis ?? ''}
            onChange={handleChange}
            isDisabled={isView}
          />
          <Input
            labelText="Conduta"
            type="text"
            name="conduct"
            value={attendance?.conduct ?? ''}
            onChange={handleChange}
            isDisabled={isView}
          />
          <Input
            labelText="Prescrição"
            type="text"
            name="prescription"
            value={attendance?.prescription ?? ''}
            onChange={handleChange}
            isDisabled={isView}
          />
          <Input
            labelText="Observações"
            type="text"
            name="observations"
            value={attendance?.observations ?? ''}
            onChange={handleChange}
            isDisabled={isView}
          />

          {!isView && (
            <div className="attendance-button-section">
              <Button width="150px" type="submit">
                Salvar
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Attendance;
