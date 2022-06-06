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
            <Container>
                <Row className='mb-3'>
                    <Col>
                        <h1>Token Setup</h1>
                        <p className='header-subtext'>Let's get started by naming your token and ticker symbol</p>
                    </Col>
                    <Col/>
                </Row>
            </Container>
            

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
                            <Button style={{minWidth: "150px"}} className='casama-primary' onClick={handleSubmit} disabled={deploying}>
                                {!deploying? <span>Next</span> : <div><Spinner animation="border" size="sm" role="status"/><span> Loading...</span></div>}
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        <h4>Information</h4>
                        <p>
                            Selecting a token name and ticker is important for your community to easily identify the networks token. It usually also represents something meaningful specific to the community. So, choose wisely :)
                        </p>
                        <p>
                            Your token will be limited to a supply of 1 Billion tokens. It is easier to manage a capped supply token than a variable one.
                        </p>
                        <p>
                            Don't worry about this too much today, you will be able to change this before going into live into Production. Next steps will be to setup a liquidity pool (more on that soon).
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Setup;