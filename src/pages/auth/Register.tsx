import React from 'react';
import '../../assets/css/register.css';
import ImagemCadastro from '../../assets/images/registerImg.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { createDoctor } from '../../api/doctor.requests';
import { IDoctor } from '../../types/Doctor';

const Register: React.FC = () => {
    const [doctor, setDoctor] = React.useState<IDoctor>({
        name: '',
        email: '',
        password: ''
    });
    const [confirmPassword, setConfirmPassword] = React.useState('');
  
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setDoctor({ ...doctor, [name]: value });
    };
  
    function showAlert(mensagem: string): void {
        alert(mensagem);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (doctor.password !== confirmPassword) {
        return alert('As senhas não coincidem');
        }
      await createDoctor(doctor);
      navigate('/');
      showAlert('Usuário cadastrado');
    };

    return (
        <>
            <div className='container'>
                <div className='register-div'>
                        <h1>Crie uma conta</h1>

                        <form className='register-form' onSubmit={handleRegister}>
                            <label>Nome Completo</label><br></br>
                            <input type='text' name='name' value={doctor.name} onChange={handleChange} required></input><br></br><br></br>

                            <label>Email</label><br></br>
                            <input type='email' name='email' value={doctor.email} onChange={handleChange} required></input><br></br><br></br>

                            <label>Senha</label><br></br>
                            <input type='password' name='password' value={doctor.password} onChange={handleChange} required></input><br></br><br></br>

                            <label>Confirmar senha</label><br></br>
                            <input type='password' name='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input><br></br><br></br>

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