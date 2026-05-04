//rfce
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar className="bg-warning p-3">
            <Container>
                <Link to={'/'} className='text-decoration-none text-dark fw-bolder'>           
                <i className='fa-solid fa-home'></i>
                {' '}
                    EMS
                </Link>
            </Container>
        </Navbar>

    )
}

export default Header
