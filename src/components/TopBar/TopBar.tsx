import { useAuth } from '../../hooks/useAuth';
import './topBar.css'
import { Link, useNavigate } from 'react-router-dom';

function TopBar(){
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () =>{
        logout();
        navigate('/');
    }
    return (
        <>
            <div>
                <header id="topBar">
                    <h3 id='title'>Prontuário+</h3>

                    <ul id='ulTop'>
                        <Link to='/Dashboard.tsx' className='liTop'>Pacientes</Link>
                        {/**<Link to='/FichaPacientes.tsx' className='liTop'>Cadastrar Pacientes</Link> */}
                        <li className='liTop' onClick={handleLogout}>Sair</li>
                    </ul>
                </header>
            </div>
        </>
    )
}
export default TopBar