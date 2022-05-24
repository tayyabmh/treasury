import React, { useState } from 'react';
import {
    Container, Row, Col,
    Form,
    Button
} from 'react-bootstrap';
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000'
})
function Setup() {
    const [tokenName, setTokenName ] = useState('');
    const [tokenTicker, setTokenTicker ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        sendTokenInfo(tokenName, tokenTicker);
    }

    const sendTokenInfo = (tokenName, tokenTicker) => {
        client.post('/setup', {
            tokenName: tokenName,
            tokenTicker: tokenTicker
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        })
    }

    return(
        <div>
            <h1>Setup</h1>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="tokenName">
                                <Form.Label>Token Name</Form.Label>
                                <Form.Control 
                                    placeholder='Name your token'
                                    onChange={e => setTokenName(e.target.value)}
                                    value={tokenName} 
                                />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="tokenTicker">
                                <Form.Label>Token Ticker (Ex. $BTC)</Form.Label>
                                <Form.Control 
                                    placeholder="$BTC"
                                    onChange={e => setTokenTicker(e.target.value)}
                                    value={tokenTicker}
                                />
                            </Form.Group>
                            <Button onClick={handleSubmit}>
                                Deploy
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <h3>Information</h3>
                        <p>
                            Currently, this will only be deployed in the Rinkeby testnet, so feel free to test around as much as you'd like.
                            We will work with you for your mainnet launch.
                        </p>
                        <p>
                            Your token supply will be limited to 1 Billion.
                        </p>
                        <p>
                            After naming your token, and it's ticker we will set you up with a) a secure Treasury contract, b) your very own token, c) get you to next steps on setting an important Liquidity Pool.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Setup;