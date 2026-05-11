import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import ImagemLogin from '../../assets/images/loginImg.jpeg';
import { useState } from 'react';
import Input from './components/Input/Input';
import PasswordInput from './components/PasswordInput/PasswordInput';
import { useAlert } from '../../components/Alert/AlertContext';
import { useDoctor } from '../../hooks/useDoctor';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginDoctor } = useDoctor();
  const { error: showError } = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      showError('Preencha email e senha');
      return;
    }
    const response = await loginDoctor(email, password);
    if (response) {
      navigate('/patientList');
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-image-container">
          <img src={ImagemLogin} className="login-image" />
        </div>
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <Input
                labelText="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                labelText="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login-btn" type="submit">
                Logar
              </button>
            </form>
            <Link to="/register">Criar uma conta</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
