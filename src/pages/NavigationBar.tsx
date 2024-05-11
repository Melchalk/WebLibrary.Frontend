import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';

export function NavigationBar(){
    return(
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/home">Library</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/books">Books</Nav.Link>
                    <Nav.Link href="/readers">Readers</Nav.Link>
                    <Nav.Link href="/issues">Issues</Nav.Link>
                    <Nav.Link href="/libraries">Libraries</Nav.Link>
                    <Nav.Link href="/librarians">Librarians</Nav.Link>
                </Nav>
                <DropdownButton id="dropdown-basic-button" title="Auth">
                    <Dropdown.Item href="/register">Register</Dropdown.Item>
                    <Dropdown.Item href="/auth">Log in</Dropdown.Item>
                    <Dropdown.Item href="/logout">Log out</Dropdown.Item>
                </DropdownButton>
            </Container>
        </Navbar>
    );
}