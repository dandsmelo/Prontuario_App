import TopBar from '../../components/TopBar/TopBar';
import '../../assets/css/patient.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IPatient } from '../../types/Patient';
import { IoIosArrowDropleft } from 'react-icons/io';
import Button from '../../components/Button/Button';
import TitleSession from '../../components/TitleSession/titleSession';
import Input from '../../components/Input/Input';
import { differenceInYears } from 'date-fns';
import { usePatient } from '../../hooks/usePatient';
import { FiExternalLink } from 'react-icons/fi';
import { IoAddCircle } from 'react-icons/io5';

const Patient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<IPatient>();
  const [family, setFamily] = useState<IPatient[]>([]);

  const navigate = useNavigate();
  const { getFamilyByIndexId, getPatientById } = usePatient();

  const handleReturnPage = () => {
    navigate('/patientList');
  };

  const translateCaseType = (caseType?: string) => {
    if (caseType == 'Family') {
      return 'Familiar';
    }
    return 'Caso índice';
  };

  const calculateAge = (birthDate: string): string => {
    return `${differenceInYears(new Date(), new Date(birthDate))} anos`;
  };

  const mountAddress = (patient: IPatient) => {
    return `${patient.address}, ${patient.number} ${patient.complement || ''} - ${patient.cep}`;
  };

  const getFamily = async (currentPatient: IPatient) => {
    let response;

    if (currentPatient.indexPatientId) {
      response = await getPatientById(currentPatient.indexPatientId);
      if (response) {
        setFamily([response]);
      }
    } else {
      response = await getFamilyByIndexId(currentPatient._id!);
      if (response) {
        setFamily(response);
      }
      return;
    }
  };

  const fetchPatient = async (id: string) => {
    const data = await getPatientById(id);
    setPatient(data);
    await getFamily(data);
  };

  const handlePatientPage = (id: string) => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    navigate(`/patient/${id}`);
  };

  const familySectionTitle = patient?.indexPatientId ? 'Caso índice' : 'Familiares';

  const familyTitleWidth = patient?.indexPatientId ? '120px' : '105px';

  const handleEditPatient = (id: string) => {
    navigate(`/patientForm/${id}`);
  };

  useEffect(() => {
    if (id) {
      fetchPatient(id);
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <>
      <TopBar></TopBar>
      <IoIosArrowDropleft
        onClick={handleReturnPage}
        className="btn-back-page"
        title="Voltar a página anterior"
      />
      <div className="patient-page-container">
        <div className="patient-header-wrapped">
          <div className="patient-header">
            <h1 className="patient-name">{patient?.name}</h1>
            <h4 className="patient-case-type">{translateCaseType(patient?.caseType)}</h4>
          </div>
          <Button width="190px">+ Novo atendimento</Button>
        </div>
        <div className="patient-section">
          <TitleSession title="Dados pessoais" />
          <div className="patient-input-section">
            <Input
              labelText="Data de nascimento"
              value={patient.birthDate}
              type="date"
              width="50%"
              isDisabled
            />
            <Input
              labelText="Idade"
              value={calculateAge(patient.birthDate)}
              type="text"
              width="50%"
              isDisabled
            />
          </div>
          <div className="patient-input-section">
            <Input labelText="Sexo" value={patient.sex} type="text" width="50%" isDisabled />
            <Input labelText="Email" value={patient.email} type="text" width="50%" isDisabled />
          </div>
          <div className="patient-input-section">
            <Input labelText="Telefone" value={patient.phone} type="tel" width="50%" isDisabled />
            <Input
              labelText="Telefone reserva"
              value={patient?.phoneReservation}
              type="tel"
              width="50%"
              isDisabled
            />
          </div>
          <div className="patient-input-section">
            <Input labelText="RG" value={patient.rg} type="text" width="50%" isDisabled />
            <Input labelText="CPF" value={patient.cpf} type="text" width="50%" isDisabled />
          </div>
          <Input labelText="Endereço" value={mountAddress(patient)} type="text" isDisabled />
        </div>
        <div className="patient-section">
          <TitleSession title="Resumo clínico" width="145px" />
          <Input labelText="Diagnóstico" value={patient.diagnosis} type="text" isDisabled />
          <Input labelText="Observações" value={patient.summary} type="text" isDisabled />
        </div>
        <div className="patient-section">
          <TitleSession title="Histórico" width="90px" />
          <div className="patient-card" title="Novo atendimento">
            <IoAddCircle className="patient-card-icon" />
            <p>Novo</p>
          </div>
        </div>
        {family.length > 0 ? (
          <div className="patient-section">
            <TitleSession title={familySectionTitle} width={familyTitleWidth} />
            {family.map((f) => (
              <ul className="patient-family-list" onClick={() => handlePatientPage(f._id!)}>
                <li className="patient-family-item">{f.name}</li>
                <FiExternalLink title="Visualizar paciente" />
              </ul>
            ))}
          </div>
        ) : (
          ''
        )}
        <div className="patient-button-section">
          <Button width="150px" onClick={() => handleEditPatient(patient._id!)}>
            Editar
          </Button>
          <Button width="150px" style={{ background: '#BA0202' }}>
            Excluir
          </Button>
        </div>
      </div>
    </>
  );
};

export default Patient;
