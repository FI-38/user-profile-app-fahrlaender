import { NavLink } from "react-router-dom";
import { Router } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./UserAppNav.css";


function UserAppNav() {
  return (
    <Navbar expand="sm" bg="light" className="user-navbar mb-4" data-bs-theme="light">
      <Container>
        <Navbar.Brand as={NavLink} to="/">User Profile App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
           <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Kontakt</Nav.Link>
              <Nav.Link as={NavLink} to="/joke">IT-Witze</Nav.Link>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link> 
           </Nav>
         </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default UserAppNav;