import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';

export function NavigationBar(){
    return(
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/libraries">Библиотека</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/books">Книги</Nav.Link>
                    <Nav.Link href="/readers">Читатели</Nav.Link>
                    <Nav.Link href="/issues">Выдачи</Nav.Link>
                </Nav>
                <DropdownButton id="dropdown-profile-button" title="Profile">
                    <Dropdown.Item href="/account">Твой аккаунт</Dropdown.Item>
                    <Dropdown.Item href="/logout">Выйти</Dropdown.Item>
                </DropdownButton>
            </Container>
        </Navbar>
    );
}