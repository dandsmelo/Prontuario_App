import { Link, useNavigate} from 'react-router-dom';
import '../../assets/css/login.css';
import ImagemLogin from '../../assets/images/loginImg.jpeg';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { loginDoctor } from '../../api/doctor.requests';
import Input from './components/Input/Input';
import PasswordInput from './components/PasswordInput/PasswordInput';

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
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <div>
      <div className='login-container'>
        <div className='login-image-container'>
          <img src={ImagemLogin} className='login-image' /> 
        </div>
        <div className='login-form-container'>
          <div className='login-form-wrapper'>
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleSubmit}>
              <Input 
                labelText='Email' 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                labelText='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className='login-btn' type='submit'>Logar</button>
            </form>
            <Link to='/register'>Criar uma conta</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
