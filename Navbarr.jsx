import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom"

const Navbarr = (prop) => {
  const navigate = useNavigate()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Travel Addict</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="" onClick={()=> navigate('/')}>Home</Nav.Link>
            <Nav.Link href="" onClick={()=> navigate('/blog')}>Blog</Nav.Link>
            <Nav.Link href="" onClick={()=> navigate('/photos-sharing')}>Photo Sharing</Nav.Link>
            <Nav.Link href="" onClick={()=> navigate('/promo')}>Promo</Nav.Link>
            <Nav.Link href="" onClick={()=> navigate('/user')}>Account {prop.userName}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;