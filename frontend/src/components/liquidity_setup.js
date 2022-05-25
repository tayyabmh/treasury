import React, {useEffect, useState} from 'react';
import {
    Container, Row, Col,
    Form,
    InputGroup, 
    Button
} from 'react-bootstrap';


function Liquidity() {
    const [tokenQuantity, setTokenQuantity] = useState(0);
    const [tokenBasePrice, setTokenBasePrice ] = useState(0);
    const [requiredBacking, setRequiredBacking ] = useState(0);

    useEffect(() => {
        if(tokenQuantity * tokenBasePrice === 0 || isNaN(tokenQuantity * tokenBasePrice)) {
            setRequiredBacking(0);
        } else {
            setRequiredBacking(tokenQuantity * tokenBasePrice)
        }
    }, [tokenQuantity, tokenBasePrice])

    const handleLiquiditySet = (e) => {
        e.preventDefault();
        localStorage.setItem("tokenQuantity", tokenQuantity);
        localStorage.setItem("tokenBasePrice", tokenBasePrice);
        localStorage.setItem("requiredBacking", requiredBacking);        
    }

    return(
        <div>
            <h1>Liquidity Management</h1>
            <Container>
                <Row>
                    <Col>
                        <h3>add to pool</h3>
                        <Form>
                            <Form.Group className='mb-3' controlId="tokenQuantity">
                                <Form.Label>Number of Tokens in Liquidity Pool</Form.Label>
                                <Form.Control
                                    placeholder='How many tokens would you like to add to the Liquidity Pool'
                                    onChange={e => setTokenQuantity(e.target.value)}
                                    value={tokenQuantity}
                                    type="number"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId='basePrice'>
                                <Form.Label>Set a desired base price for your token</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        placeholder="Ex. $0.50"
                                        onChange={e => setTokenBasePrice(e.target.value)}
                                        value={tokenBasePrice}
                                        type="decimal"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='requiredBacking'>
                                <Form.Label>Required backing (Base Price X Number of Tokens)</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <Form.Control
                                        placeholder="0"
                                        value={requiredBacking}
                                        type="decimal"
                                        readOnly
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Button onClick={handleLiquiditySet}>
                                    Set
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <h3>Information</h3>
                        <p>
                            We recommend adding in 10% of total tokens into a liquidity pool, along with a beginning base price for the token. For example, 1,000,000 tokens backed with $10,000 for a base price of $0.10 / token.
                        </p>
                        <p>Don't worry about actually doing this just yet, we are simply getting set up.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Liquidity;