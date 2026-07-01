import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAppSelector } from '../redux/hooks';

function Header() {
    const users = useAppSelector(state => state.user.listUsers)
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Redux {users.length}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Lan Anh</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;