import React, {useState} from 'react';
import TopBar from '../../components/TopBar/TopBar';
import { IPatient } from '../../types/Patient';
import '../../assets/css/patientForm.css';
import { createPatient } from '../../api/patient.requests';
import { useNavigate } from 'react-router-dom';

const FichaPacientes: React.FC = () => {
    
    const [paciente, setPaciente] = useState({} as IPatient);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPaciente({ ...paciente, [name]: value });
      };

    const savePatient = async (e: React.FormEvent) =>{
        try {
            e.preventDefault();
            await createPatient(paciente);
            navigate('/patientList');
            alert('Paciente Cadastrado');
        } catch (error) {
            alert('Esse paciente já existe');
        }
    }

    return(
        <>
            <div>
                <TopBar></TopBar>
                <form onSubmit={savePatient}>
                    <h1 className='title'>Ficha do Paciente</h1>

                    <label>Nome Completo</label><br></br>
                    <input type="text" id="name" name='nome' value={paciente.nome} className="inputs bigInputs" onChange={handleChange} required></input><br></br>

                    <span className='inputDuplos'>
                        <span>
                            <label>Data de Nascimento</label><br></br>
                            <input type="date" id="date" className="inputs" onChange={handleChange} name='dt_nascimento' value={paciente.dt_nascimento} required></input><br></br>
                        </span>

                        <span>
                            <label>Sexo</label><br></br>
                            <select id="sex-select" className='inputs'onChange={handleChange} name='sexo' defaultValue="Feminino" value={paciente.sexo} required>
                                <option value="Feminino">Feminino</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Outro">Outro</option>
                            </select><br></br>
                        </span>
                    </span>

                    <span className='inputDuplos'>
                        <span>
                            <label>Telefone</label><br></br>
                            <input type="tel" pattern="[0-9]{10}" id="phoneNum" className="inputs" onChange={handleChange} name='telefone' value={paciente.telefone} required></input>
                        </span>

                        <span>
                            <label>Telefone Reserva</label><br></br>
                            <input type="tel" pattern="[0-9]{10}" id="telephone" className="inputs" onChange={handleChange} name='telefone_reserva' value={paciente.telefone_reserva}></input><br></br>
                        </span>
                    </span>

                    <span className='inputDuplos'>
                        <span>
                            <label>CPF</label><br></br>
                            <input type="text" id="cpf" className="inputs" onChange={handleChange} name='cpf' value={paciente.cpf} required></input><br></br>
                        </span>

                        <span>
                            <label>RG</label><br></br>
                            <input type="text" id="rg" className="inputs" onChange={handleChange} name='rg' value={paciente.rg} required></input><br></br>
                        </span>
                    </span>

                    <label>Endereço</label><br></br>
                    <input type="text" id="log" className="inputs bigInputs" onChange={handleChange} name='endereco' value={paciente.endereco} required></input><br></br>

                    <span className='inputDuplos'>
                        <span>
                            <label>Número</label><br></br>
                            <input type="number" id="numero" className="inputs" onChange={handleChange} name='numero' value={paciente.numero} required></input><br></br>
                        </span>

                        <span>
                            <label>Complemento</label><br></br>
                            <input type="text" id="complemento" className="inputs" onChange={handleChange} name='complemento' value={paciente.complemento}></input><br></br>
                        </span>
                    </span>

                    <span className='inputDuplos'>
                        <span>
                            <label>Bairro</label><br></br>
                            <input type="text" id="bairro" className="inputs" onChange={handleChange} name='bairro' value={paciente.bairro} required></input><br></br>
                        </span>

                        <span>
                            <label>CEP</label><br></br>
                            <input type="text" id="cep" className="inputs" onChange={handleChange} name='cep' value={paciente.cep} required></input><br></br>
                        </span>
                    </span>

                    <label>Diágnostico</label><br></br>
                    <input type="text" className="inputs bigInputs" onChange={handleChange} name='diagnostico' value={paciente.diagnostico} required></input><br></br>

                    <label>Resumo</label><br></br>
                    <input type="text" id="resumo" className="inputs bigInputs" onChange={handleChange} name='resumo' value={paciente.resumo}></input>

                    <br></br>

                    <button className='btn-save' type='submit'>Salvar</button>
                    {/* <button className='btnSave' type='reset'>Limpar</button> */}

                </form>
            </div>
        </>
    )
}

export default FichaPacientes

