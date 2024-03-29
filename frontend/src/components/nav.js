import React from 'react';
import {
    Navbar,
    Container,
    Nav
} from 'react-bootstrap';

// import { ConnectButton } from '@rainbow-me/rainbowkit';

function NavigationSidebar() {
    return (
            <Navbar variant="dark" bg="dark" style={{marginBottom: "10px"}} >
            <Container>
                <Navbar.Brand href="/">Casama</Navbar.Brand>
                <Nav className="me-auto">
                  {/* TODO: Remove before finish */}
                  <Nav.Link href="/setup">Setup</Nav.Link>
                  {/* <Nav.Link href="/dashboard">Dashboard</Nav.Link> */}
                  <Nav.Link href="/liquidity">Liquidity</Nav.Link>
                  <Nav.Link href="/wallets">Wallets</Nav.Link>
                  <Nav.Link href="/manage_token">Token</Nav.Link>
                    {/* <Nav.Link href="/admin">Admin</Nav.Link>
                    <Nav.Link href="/contribute">Contribute</Nav.Link>
                    <Nav.Link href="/incentive">Incentivize</Nav.Link>
                    <Nav.Link href="/user">User Page</Nav.Link>
                    <Nav.Link href="/setup">Setup</Nav.Link>*/}
                    {/* <Nav.Link href="/govern">Governance</Nav.Link> */}
              </Nav>
              {/* <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                <ConnectButton accountStatus="address" chainStatus="full" showBalance={true} />
              </Navbar.Collapse> */}
            </Container>
            </Navbar>
    );
}

export default NavigationSidebar;