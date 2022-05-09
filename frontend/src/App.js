// Style Imports
import './App.css';
import "@rainbow-me/rainbowkit/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';


// Web3 Imports
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton
} from '@rainbow-me/rainbowkit';
import { chain, createClient, WagmiProvider } from 'wagmi';

// React imports
import React from 'react';
import { 
  Navbar,
  Container,
  Nav,
} from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';

//Local file imports
import Contribute from './components/contribute';
import Incentive from './components/incentive';
import Admin from './components/admin';
import Governance from './components/govern';
import User from './components/user';

const { chains, provider } = configureChains(
  [chain.hardhat],
  [apiProvider.fallback()]
)

const { connectors } = getDefaultWallets({
  appName: "Kasama - Web3 Incentives",
  chains
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

class App extends React.Component {  



  render() {
    return (
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains} >
          <div className="App">
            <div className="top" style={{marginBottom: "100px"}}>
            <Navbar bg="dark" variant="dark" style={{marginBottom: "10px"}} >
            <Container>
              <Navbar.Brand href="/">Kasana</Navbar.Brand>
              
              <Nav className="me-auto">
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link href="/contribute">Contribute</Nav.Link>
                <Nav.Link href="/incentive">Incentivize</Nav.Link>
                <Nav.Link href="/user">User Page</Nav.Link>
                <Nav.Link href="/govern">Governance</Nav.Link>
              </Nav>
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                <ConnectButton accountStatus="address" chainStatus="full" showBalance={true} />
              </Navbar.Collapse>
            </Container>
            </Navbar>
            <Container>
            </Container>
            </div>
            <Routes>
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/incentive" element={<Incentive />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/user" element ={<User/>} />
              <Route path="/govern" element={<Governance />} />
            </Routes>
          </div>
        </RainbowKitProvider>
      </WagmiProvider>
     
    );  
  }
}

export default App;
