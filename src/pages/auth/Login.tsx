import { Link, useNavigate} from 'react-router-dom';
import '../../assets/css/login.css';
import ImagemLogin from '../../assets/images/loginImg.jpeg';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { loginDoctor } from '../../api/doctor.requests';

const Login: React.FC = () =>  {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginDoctor( email, password );
      if (response.status === 200) {
        login(response.data.token);
        navigate('/patientList');
      }
    } catch (error) {
      console.error
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <>
       <div className='login-container'>
        <div>
          <img src={ImagemLogin} className='img-login'></img> 
        </div>

        <div className='div-login' id='div2'>
          <h1>Login</h1>

          <form className='form-login' onSubmit={handleSubmit}>

            <label>Email</label><br></br>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} required></input><br></br><br></br>

            <label>Senha</label><br></br>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input><br></br><br></br>

            <button className='btn-login' type='submit'>Logar</button><br></br>

          </form>

          <Link to='/register'>Criar uma conta</Link>
        </div>

       </div>
    </>
  )
}

export default Login
