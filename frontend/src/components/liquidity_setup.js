import React, {useEffect, useState} from 'react';
import {
    Container, Row, Col,
    Form,
    InputGroup, 
    Button,
    Spinner
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Liquidity() {
    const navigate = useNavigate();

    const [tokenQuantity, setTokenQuantity] = useState(0);
    const [tokenBasePrice, setTokenBasePrice ] = useState(0);
    const [requiredBacking, setRequiredBacking ] = useState(0);
    const [ deploying, setDeploying ] = useState(false);

    useEffect(() => {
        if(tokenQuantity * tokenBasePrice === 0 || isNaN(tokenQuantity * tokenBasePrice)) {
            setRequiredBacking(0);
        } else {
            setRequiredBacking(tokenQuantity * tokenBasePrice)
        }
    }, [tokenQuantity, tokenBasePrice])

    const handleLiquiditySet = (e) => {
        e.preventDefault();
        setDeploying(true);
        setTimeout(function() {
            setDeploying(false);
            localStorage.setItem("tokenQuantity", tokenQuantity);
            localStorage.setItem("tokenBasePrice", tokenBasePrice);
            localStorage.setItem("requiredBacking", requiredBacking);
            navigate('/manage_token');
        }, 3000);
        
    }

    return(
        <div style={{textAlign: 'left'}}>
            <Container>
            <Row>
                <h1>Initial Token Pricing</h1>
            </Row>
            </Container>
            
            <Container style={{marginTop: "16px"}}>
                <Row>
                    <Col>
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
                                <Form.Label>Required backing (Base Price * Number of Tokens)</Form.Label>
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
                                <Button onClick={handleLiquiditySet} className="casama-primary" style={{minWidth: "150px"}} disabled={deploying}>
                                    {!deploying ? <span>Set</span> : <div><Spinner animation="border" size="sm" role="status"/><span> Loading...</span></div>}
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <h4>Pricing & Liquidity</h4>
                        <a href="/">How do Liquidity Pools work?</a>
                        <img src='liquidity_explainer.jpeg' alt="uniswap liquidity explainer"width={450}/>
                        <p>
                            Your tokens price is determined by the current market rate, which is determined by it's relative value to an asset like the US Dollar.
                        </p>
                        <p>
                            Your coin can be listed permissionlessly on a decentralized exchange like Uniswap. But, someone must provide the liquidity for this. In almost all cases, this is done by the team behind the token project. But, other people can also contribute to the liquidity pool.
                        </p>
                        
                        <p>
                            We recommend adding in 10% of total tokens into a liquidity pool, along with a beginning base price for the token. For example, 1,000,000 tokens backed with $10,000 for a base price of $0.10 / token.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default Liquidity;