import React from 'react';
import {
    Container, Row, Col,
    Form,
    Button
} from 'react-bootstrap';

function Setup() {
    return(
        <div>
            <h1>Setup</h1>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="tokenName">
                                <Form.Label>Token Name</Form.Label>
                                <Form.Control placeholder='Name your token' />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId="tokenTicker">
                                <Form.Label>Token Ticker (Ex. $BTC)</Form.Label>
                                <Form.Control placeholder="$BTC"/>
                            </Form.Group>
                            <Button>
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