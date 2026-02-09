import TopBar from "../../components/TopBar/TopBar";
import '../../assets/css/patientList.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientsByDoctorId } from "../../api/patient.requests";

interface PatientTable {
    _id: string,
    name: string,
    diagnosis: string,
    rg: string,
}

const PatientList: React.FC = () => {

    const [pacientes, setPacientes] = useState<PatientTable[]>([]);
  
    useEffect(() => {
      async function fetchPatientSummary() {
        const data = await getPatientsByDoctorId();
        setPacientes(data);
      }
  
      fetchPatientSummary();
    }, []);

    const navigate = useNavigate();
    
    const handleRowClick = (id: string) => {
        navigate(`/patient/${id}`);
      };

    return(
        <>
            <TopBar />
            <div id="box">
                <h1>Meus Pacientes</h1>
                <div id="mini-box">
                    <table>
                        <thead>
                            <tr id="line">
                                <th>Paciente</th>
                                <th>Diagnóstico</th>
                                <th>RG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map((paciente) => (
                                <tr key={paciente._id} className="tr-pacientes" onClick={() => handleRowClick(paciente._id)}>
                                    <td>{paciente.name}</td>
                                    <td>{paciente.diagnosis}</td>
                                    <td>{paciente.rg}</td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/patientForm' className="btn-add">Novo paciente</Link>
            </div>
        </>
    )
}

export default PatientList;