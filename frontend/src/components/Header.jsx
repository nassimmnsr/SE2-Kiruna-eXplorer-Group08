// Header.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar style={{ backgroundColor: "#e7ebda" }} fixed="top">
      <Container fluid className="px-3">
        <Navbar.Brand href="/" className='align-middle'>Kiruna Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='align-middle'href="/documents" >Documents</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
