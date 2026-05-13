import React from 'react';
import '../../assets/css/register.css';
import ImagemCadastro from '../../assets/images/registerImg.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import { IDoctor } from '../../types/Doctor';
import Input from './components/Input/Input';
import PasswordInput from './components/PasswordInput/PasswordInput';
import { useAlert } from '../../components/Alert';
import { useDoctor } from '../../hooks/useDoctor';
import Button from '../../components/Button/Button';

const Register: React.FC = () => {
  const [doctor, setDoctor] = React.useState<IDoctor>({
    name: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigate = useNavigate();
  const { createDoctor } = useDoctor();
  const { success, error: showError } = useAlert();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (doctor.password !== confirmPassword) {
      return showError('As senhas não coincidem');
    }
    const response = await createDoctor(doctor);
    if (response) {
      success('Usuário cadastrado');
      navigate('/');
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-container-form">
          <h1>Crie uma conta</h1>
          <form className="register-form" onSubmit={handleRegister}>
            <Input
              labelText="Nome"
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
            />
            <Input
              labelText="Email"
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
            />
            <PasswordInput
              labelText="Senha"
              value={doctor.password}
              name="password"
              onChange={handleChange}
            />
            <PasswordInput
              labelText="Confirmar senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button className="btn-register" type="submit">
              Cadastre-se
            </Button>
            <br></br>
          </form>
          <Link to="/">Já tenho uma conta</Link>
        </div>
        <div>
          <img src={ImagemCadastro} className="register-image"></img>
        </div>
      </div>
    </>
  );
};

export default Register;
