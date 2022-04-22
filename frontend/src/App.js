import './App.css';
import { ethers } from "ethers";
import React from 'react';
import { 
  Navbar,
  Container,
  Nav
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contribute from './components/contribute';
import { Routes, Route, Link } from 'react-router-dom';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

console.log(signer);

class App extends React.Component {  

  render() {
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Kasana</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav"/>
          <Nav className="me-auto">
            <Nav.Link href="/contribute">Contribute</Nav.Link>
            <Nav.Link href="/incentivize">Incentivize</Nav.Link>
            <Nav.Link href="/govern">Governance</Nav.Link>
          </Nav>
        </Container>
        </Navbar>
        <Routes>
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </div>
    );  
  }
}

export default App;
