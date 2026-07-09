import React, { useEffect, useState } from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { IPatient } from '../../types/Patient';
import '../../assets/css/patientForm.css';
import { useNavigate } from 'react-router-dom';
import TitleSession from '../../components/TitleSession/titleSession';
import { IoIosArrowDropleft } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import { usePatient } from '../../hooks/usePatient';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import { useAlert } from '../../components/Alert';

const FichaPacientes: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPatientById, createPatient, updatePatient } = usePatient();
  const { success } = useAlert();
  const isEditing = !!id;
  const [patient, setPatient] = useState<IPatient>({
    _id: '',
    name: '',
    caseType: 'Index',
    birthDate: '',
    sex: 'Feminino',
    email: '',
    phone: '',
    phoneReservation: '',
    cpf: '',
    rg: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    cep: '',
    diagnosis: '',
    summary: '',
  });

  const loadPatient = async () => {
    if (!id) return;

    const response = await getPatientById(id);
    setPatient(response);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const savePatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      const patientData = {
        ...patient,
      };

      delete patientData._id;
      delete patientData.doctorId;

      await updatePatient(id!, patientData);
      success('Paciente atualizado com sucesso!');
      navigate(`/patient/${id}`);
    } else {
      await createPatient(patient);
      success('Paciente salvo com sucesso!');
      navigate('/patientList');
    }
  };

  const handleReturnPage = () => {
    navigate('/patientList');
  };

  useEffect(() => {
    if (id) {
      loadPatient();
    }
  }, [id]);

  return (
    <>
      <TopBar></TopBar>
      <IoIosArrowDropleft
        onClick={handleReturnPage}
        className="btn-back-page"
        title="Voltar a página anterior"
      />
      <div className="patient-form-container">
        <h1 className="patient-list-header">Ficha do Paciente</h1>
        <form onSubmit={savePatient} className="patient-list-form ">
          <TitleSession title="Dados pessoais" />
          <Input
            labelText="Nome completo"
            value={patient.name ?? ''}
            type="text"
            name="name"
            onChange={handleChange}
          />
          <div className="patient-list-input-section">
            <Input
              labelText="Data de nascimento"
              value={patient.birthDate ?? ''}
              type="date"
              width="50%"
              name="birthDate"
              onChange={handleChange}
            />
            <Select
              labelText="Caso"
              value={patient.caseType ?? ''}
              width="50%"
              name="caseType"
              onChange={handleChange}
              options={[
                { label: 'Índice', value: 'Index' },
                { label: 'Familiar', value: 'Family' },
              ]}
            />
          </div>
          <div className="patient-list-input-section">
            <Select
              labelText="Sexo"
              value={patient.sex ?? ''}
              width="50%"
              name="sex"
              onChange={handleChange}
              options={[
                { label: 'Feminino', value: 'feminino' },
                { label: 'Masculino', value: 'masculino' },
                { label: 'Outro', value: 'outro' },
              ]}
            />
            <Input
              labelText="Email"
              value={patient.email ?? ''}
              type="email"
              width="50%"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="patient-list-input-section">
            <Input
              labelText="Telefone"
              value={patient.phone ?? ''}
              type="tel"
              width="50%"
              name="phone"
              onChange={handleChange}
            />
            <Input
              labelText="Telefone reserva"
              value={patient.phoneReservation ?? ''}
              type="tel"
              name="phoneReservation"
              width="50%"
              onChange={handleChange}
            />
          </div>
          <div className="patient-list-input-section">
            <Input
              labelText="RG"
              value={patient.rg ?? ''}
              type="text"
              width="50%"
              name="rg"
              onChange={handleChange}
            />
            <Input
              labelText="CPF"
              value={patient.cpf ?? ''}
              type="text"
              width="50%"
              name="cpf"
              onChange={handleChange}
            />
          </div>
          <Input
            labelText="Endereço"
            value={patient.address ?? ''}
            type="text"
            name="address"
            onChange={handleChange}
          />
          <div className="patient-list-input-section">
            <Input
              labelText="Número"
              value={patient.number ?? ''}
              type="text"
              width="50%"
              name="number"
              onChange={handleChange}
            />
            <Input
              labelText="Complemento"
              value={patient.complement ?? ''}
              type="text"
              width="50%"
              name="complement"
              onChange={handleChange}
            />
          </div>
          <div className="patient-list-input-section">
            <Input
              labelText="Bairro"
              value={patient.neighborhood ?? ''}
              type="text"
              width="50%"
              name="neighborhood"
              onChange={handleChange}
            />
            <Input
              labelText="CEP"
              value={patient.cep ?? ''}
              type="text"
              width="50%"
              name="cep"
              onChange={handleChange}
            />
          </div>
          <TitleSession title="Resumo clínico" />
          <Input
            labelText="Diagnóstico"
            value={patient.diagnosis ?? ''}
            type="text"
            name="diagnosis"
            onChange={handleChange}
          />
          <Input
            labelText="Resumo"
            value={patient.summary ?? ''}
            type="text"
            name="summary"
            onChange={handleChange}
          />
          <div className="patient-button-section">
            <Button width="150px" type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FichaPacientes;
