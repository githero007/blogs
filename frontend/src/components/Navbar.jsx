import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
export function Navbar1() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link href="/viewblog">Home</Nav.Link>
                    <Nav.Link href="/postblog">  post blog </Nav.Link>
                    <Nav.Link href="/myblog">My Blogs</Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    );
}