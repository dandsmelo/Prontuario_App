import { useAuth } from '../../hooks/useAuth';
import './topBar.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsPeopleFill } from 'react-icons/bs';
import { IoIosPaper } from 'react-icons/io';

function TopBar() {
  const navigate = useNavigate();
  const { logout, getDoctorName } = useAuth();

  const handleLogout = async () => {
    logout();
    navigate('/');
  };

  const doctorName = getDoctorName();
  const doctorFirstName = doctorName?.split(' ')[0] || '';

  return (
    <>
      <header className="topbar">
        <h3 className="logo">Prontuário+</h3>
        <div className="page-list-container">
          <div className="page-list-item">
            <BsPeopleFill className="icon" />
            <Link to="/patientList" className="page-link">
              Pacientes
            </Link>
          </div>
          <div className="page-list-item">
            <IoIosPaper className="icon" />
            <Link to="#" className="page-link">
              Atendimentos
            </Link>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          {doctorFirstName}
        </button>
      </header>
    </>
  );
}
export default TopBar;
