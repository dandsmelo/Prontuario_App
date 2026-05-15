import TopBar from '../../components/TopBar/TopBar';
import '../../assets/css/patientList.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPatient } from '../../types/Patient';
import Button from '../../components/Button/Button';
import { FiSearch } from 'react-icons/fi';
import { usePatient } from '../../hooks/usePatient';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const { getPatientsByDoctorId } = usePatient();

  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/patient/${id}`);
  };

  const handleBtnClick = () => {
    navigate('/patientForm');
  };

  useEffect(() => {
    async function fetchPatient() {
      const data = await getPatientsByDoctorId();
      setPatients(data);
    }
    fetchPatient();
  }, []);

  return (
    <>
      <TopBar />
      <div className="patient-list-container">
        <h1 className="patient-list-title">Pacientes</h1>
        <div className="search-patients-container">
          <div className="search-patients">
            <FiSearch className="search-patient-icon" />
            <input className="search-patient-input" placeholder="Buscar paciente" />
          </div>
          <Button width="160px" onClick={handleBtnClick}>
            + Novo paciente
          </Button>
        </div>
        <div className="patient-table-container">
          <table className="patient-table">
            <thead>
              <tr className="patients-table-header">
                <th className="patients-table-th">Nome</th>
                <th className="patients-table-th">Diagnóstico</th>
                <th className="patients-table-th">RG</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient._id}
                  className="patients-table-tr"
                  onClick={() => handleRowClick(patient._id)}
                >
                  <td className="patients-table-td">{patient.name}</td>
                  <td className="patients-table-td">{patient.diagnosis}</td>
                  <td className="patients-table-td">{patient.rg}</td>
                </tr>
              ))}
              <tr className="patients-table-footer" />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PatientList;
