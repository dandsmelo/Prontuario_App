import TopBar from "../../components/TopBar/TopBar";
import '../../assets/css/patient.css'
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPatientById } from "../../api/patient.requests";
import { IPatient } from "../../types/Patient";
import arrow from '../../assets/images/arrow.png';

const Patient: React.FC = () => {
    
    const { id } = useParams<{ id: string }>();
    const [paciente, setPaciente] = useState<IPatient>();

    useEffect(() => {
        async function fetchPatient() {
          if (id) {
            const data = await getPatientById(id);
            setPaciente(data);
          }
        }
    
        fetchPatient();
      }, [id]);
    
      if (!paciente) {
        return <div>Carregando...</div>;
      }

    return(
        <>
            <TopBar></TopBar>
            <Link to='/patientList' className="btn-back"><img src={arrow} id="arrow"></img>Pacientes</Link>
            <div id="container">

                <div id="grid-item">
                    <h1>Informações do Paciente</h1>
                    <hr></hr>
                </div>
            
                <div id="grid-item1">

                    <h3>{paciente.nome}</h3>
                    <span id="diagnostico">Caso Índice</span>

                    <h3>Diagnóstico</h3>
                    <span>{paciente.diagnostico}</span><br></br>

                    <h3>Resumo</h3>
                    <p id="p">{paciente.resumo}</p><br></br>

                    <h3>Familiares</h3>
                    <button className="buttons">Adicionar familiar</button>
                    <span><ul id='ulFamily'>
                        <a><li className='liFicha'>Caso 1</li></a>
                    </ul></span>

                    <br></br>

                   

                    <br></br><br></br>

                    <div className="btn-container">
                        <button className="buttons">Deletar</button>
                        <button className="buttons">Editar</button><br></br>
                    </div>

                    </div>

                    <div id="grid-item2">
                        <h3>Data de Nascimento</h3>
                        <span>{paciente.dt_nascimento}</span>

                        <h3>Sexo</h3>
                        <span>{paciente.sexo}</span>

                        <h3>CPF</h3>
                        <span>{paciente.cpf}</span>

                        <h3>RG</h3>
                        <span>{paciente.rg}</span>

                        <h3>Telefone</h3>
                        <span>{paciente.telefone}</span>
                    </div>

                    <div id="grid-item3">

                        <h3>Telefone Reserva</h3>
                        <span>{paciente.telefone_reserva}</span>

                        <h3>Logradouro</h3>
                        <span>{paciente.endereco}</span>

                        <h3>Número</h3>
                        <span>{paciente.numero}</span>

                        <h3>Bairro</h3>
                        <span>{paciente.bairro}</span>

                        <h3>CEP</h3>
                        <span>{paciente.cep}</span>

                    </div>

            </div>
        </>
    )
}

export default Patient