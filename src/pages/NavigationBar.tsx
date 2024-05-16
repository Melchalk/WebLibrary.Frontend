import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import { useAppSelector } from '../redux/hooks';

export function NavigationBar(){
    const isLogin = useAppSelector(state => state.auth.isLogin)

    return(
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/libraries">Библиотеки</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/books">Книги</Nav.Link>
                    <Nav.Link href="/readers">Читатели</Nav.Link>
                    <Nav.Link href="/issues">Выдачи</Nav.Link>
                </Nav>
                {isLogin ?
                    <DropdownButton id="dropdown-profile-button" title="Profile">
                        <Dropdown.Item href="/account">Your profile</Dropdown.Item>
                        <Dropdown.Item href="/logout">Log out</Dropdown.Item>
                    </DropdownButton> :
                    <DropdownButton id="dropdown-auth-button" title="Auth">
                        <Dropdown.Item href="/register">Register</Dropdown.Item>
                        <Dropdown.Item href="/auth">Log in</Dropdown.Item>
                    </DropdownButton> }
            </Container>
        </Navbar>
    );
}