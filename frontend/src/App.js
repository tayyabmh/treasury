import './App.css';
import { ethers } from "ethers";
import React from 'react';
import { 
  Navbar,
  Container,
  Nav,
  Button,
  Row, Col
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contribute from './components/contribute';
import { Routes, Route } from 'react-router-dom';
import Incentive from './components/incentive';
import Admin from './components/admin';
import Governance from './components/govern';
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

console.log(signer);

class App extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      walletAddress: ''
    }

    this.handleConnectWallet = this.handleConnectWallet.bind(this);
  }

  async handleConnectWallet(e) {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    console.log("Accounts: ", accounts);
    this.setState({
      walletAddress: accounts[0]
    })
}


  render() {
    return (
      <div className="App">
        <div className="top" style={{marginBottom: "100px"}}>
        <Navbar bg="dark" variant="dark" style={{marginBottom: "10px"}} >
        <Container>
          <Navbar.Brand href="/">Kasana</Navbar.Brand>
          
          <Nav className="me-auto">
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link href="/contribute">Contribute</Nav.Link>
            <Nav.Link href="/incentive">Incentivize</Nav.Link>
            <Nav.Link href="/govern">Governance</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Button onClick={this.handleConnectWallet}>Connect Wallet</Button>
          </Navbar.Collapse>
        </Container>
        </Navbar>
        <Container>
        <Row>
          <Col/>
          <Col/>
          <Col xs={5}><span style={{fontWeight: "bold"}}>Wallet Address:</span> {this.state.walletAddress} </Col>
        </Row>
        </Container>
        </div>
        <Routes>
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/incentive" element={<Incentive />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/govern" element={<Governance />} />
        </Routes>
      </div>
    );  
  }
}

export default App;
