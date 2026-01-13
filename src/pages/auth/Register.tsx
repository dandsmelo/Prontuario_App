import React, {useState} from 'react';
import '../../assets/css/register.css';
import ImagemCadastro from '../../assets/images/registerImg.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { createDoctor } from '../../api/doctor.requests';
import { IDoctor } from '../../types/Doctor';

const Register: React.FC = () => {
    
    const [doutor, setDoutor] = useState({} as IDoctor);
  
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setDoutor({ ...doutor, [name]: value });
    };
  
    function showAlert(mensagem: string): void {
        alert(mensagem);
    };

    const cadastrar = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await createDoctor(doutor);
      navigate('/');
      showAlert('Usuário cadastrado');
    };

    return(
        <>
            <div className='container'>
                <div className='register-div'>
                        <h1>Crie uma conta</h1>

                        <form className='register-form' onSubmit={cadastrar}>
                            <label>Nome Completo</label><br></br>
                            <input type='text' name='nome' value={doutor.nome} onChange={handleChange} required></input><br></br><br></br>

                            <label>Nome de Usuário</label><br></br>
                            <input type='text'name='user' value={doutor.user} onChange={handleChange} required></input><br></br><br></br>

                            <label>Email</label><br></br>
                            <input type='email' name='email' value={doutor.email} onChange={handleChange} required></input><br></br><br></br>

                            <label>Senha</label><br></br>
                            <input type='password' name='senha' value={doutor.senha} onChange={handleChange} required></input><br></br><br></br>

                            <button className='btn-register' type='submit'>Cadastre-se</button><br></br>

                        </form>
                        <Link to='/'>Já tenho uma conta</Link>
                    </div>

                    <div>
                        <img src={ImagemCadastro} className='img'></img>
                    </div>
            </div>
        </>
    )
}

export default Register