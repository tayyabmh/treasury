import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col,
    Form,
    Button,
    Spinner
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




function Setup() {
    const navigate = useNavigate();

    const [tokenName, setTokenName ] = useState('');
    const [tokenTicker, setTokenTicker ] = useState('');
    const [deploying, setDeploying ] = useState(false);

    useEffect(() => {
        if(tokenTicker === '') {
            setTokenTicker('$');
        }
    }, [tokenTicker])

    const handleSubmit = (e) => {
        e.preventDefault();
        setDeploying(true);
        setTimeout(function() {
            setDeploying(false);
            sendTokenInfo(tokenName, tokenTicker);

        }, 3000);
    }

    const sendTokenInfo = (tokenName, tokenTicker) => {
        localStorage.setItem("tokenName", tokenName);
        localStorage.setItem("tokenTicker", tokenTicker);
        navigate('/liquidity_setup');
    }

    return(
        <div style={{textAlign: 'left'}}>
            <Row style={{margin: "20px 105px"}}><h1>Token Setup</h1></Row>

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
                            <Button style={{minWidth: "150px"}} onClick={handleSubmit} disabled={deploying}>
                                {!deploying? <span>Next</span> : <div><Spinner animation="border" size="sm" role="status"/><span> Loading...</span></div>}
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