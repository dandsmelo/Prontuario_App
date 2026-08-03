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
  const [searchParam, setSearchParam] = useState<string>('name');
  const [search, setSearch] = useState('');
  const { getPatientsByDoctorId, searchPatients } = usePatient();

  const navigate = useNavigate();

  const handleRowClick = (id: string) => {
    navigate(`/patient/${id}`);
  };

  const handleBtnClick = () => {
    navigate('/patientForm');
  };

  const handleChangeSearchParam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParam(e.target.value);
  };

  const handleSearchPatient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchOptions = [
    { label: 'Nome', value: 'name' },
    { label: 'RG', value: 'rg' },
    { label: 'CPF', value: 'cpf' },
  ];

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!search.trim()) {
        const data = await getPatientsByDoctorId();
        setPatients(data);
        return;
      }

      const data = await searchPatients(searchParam, search);
      setPatients(data);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, searchParam]);

  return (
    <>
      <TopBar />
      <div className="patient-list-container">
        <h1 className="patient-list-title">Pacientes</h1>
        <div className="search-patients-container">
          <div className="search-patients">
            <FiSearch className="search-patient-icon" />
            <input
              className="search-patient-input"
              placeholder="Buscar paciente"
              value={search}
              onChange={handleSearchPatient}
            />
            <select
              name={searchParam}
              onChange={handleChangeSearchParam}
              className="search-patient-select"
            >
              {searchOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
                  onClick={() => handleRowClick(patient._id!)}
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
