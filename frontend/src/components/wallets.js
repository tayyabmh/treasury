import React, { useEffect, useState } from 'react';
import {
    Table,
    Container,
    Col,
    Row,
    Button
} from 'react-bootstrap';
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000'
});

const TOKEN_PRICE = 0.1;



function Wallets() {
    const [ userWallets, setUserWallets ] = useState([]);
    const [ refreshing, setRefreshing ] = useState(false);

    useEffect(() => {
        if(userWallets.length === 0) {
            client.get('/wallets/list')
                .then(res => {
                    setUserWallets(res.data);
                })
                .catch( err => {
                    console.error(err);
                })
        }
    }, [userWallets])

    const handleRefresh = (e) => {
        e.preventDefault();
        setRefreshing(true);
        client.get('/wallets/list')
            .then(res => {
                setUserWallets(res.data);
                setRefreshing(false);
            })
            .catch( err => {
                console.error(err);
                setRefreshing(false);
            })
    }

    return (
        <div>
            <Row>
                <Col>
            <h1>Wallets</h1>

                </Col>
                <Col>
                <Button variant="outline-primary" onClick={handleRefresh}>    
                    <span>Refresh </span><i className={"fa-solid fa-arrows-rotate" + (refreshing ? " fa-spin" : "")}></i>
                </Button>
                </Col>
            </Row>
            <Container>
                <Col>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Wallet Address</th>
                            <th>Token Holdings (value)</th>
                            <th>Cash Holdings</th>
                        </tr>
                    </thead>
                    <tbody>
                            {userWallets.map((wallet) => {
                                return(
                                <tr key={wallet.id}>
                                    <td>{wallet.id}</td>
                                    <td>{wallet.name}</td>
                                    <td>{wallet.email}</td>
                                    <td>{wallet.walletAddress}</td>
                                    <td>{wallet.tokenHoldings + ' ($' + (wallet.tokenHoldings * TOKEN_PRICE) + ')'}</td>
                                    {/* TODO: add this into API */}
                                    <td>$0</td>
                                </tr>
                            )})}
                        </tbody>
                </Table>
                </Col>
            </Container>
            

        </div>
    );
}

export default Wallets;