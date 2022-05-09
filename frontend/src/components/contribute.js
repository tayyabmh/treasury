import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';
import {
    Button,
    Container,
    Form,
    Col, Row,
    Tabs,
    Tab
} from 'react-bootstrap';
import React, {useState} from 'react';

import { useContractWrite, useContractRead } from 'wagmi';
import { ethers } from 'ethers';


function Contribute() {
    const [contributionAmount, setContributionAmount] = useState(0);
    const [treasuryValue, setTreasuryValue ] = useState(0);

    const contributeFunds = useContractWrite(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI,
        },
        'contributeFunds',
        {
            overrides: {value: ethers.utils.parseEther(contributionAmount.toString())}
        }
    )

    const getUSDBalance = useContractRead(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        'getUSDBalance'
    )


    const handleContribute = async (e) => {
        e.preventDefault();
        contributeFunds.write();   
    }

    const handleGetTotalFunds = (e) => {
        e.preventDefault();
        setTreasuryValue(ethers.utils.formatUnits(getUSDBalance.data,18));
    }

    return(
        <div>
                <Row>
                    <Col><h5>Treasury Value:</h5> {treasuryValue} USD</Col>
                </Row>
                
                <br/>
                <div><h3>Make a Contribution to you Community Treasury</h3>
                <br/>
                <Row>
                    <Col/>
                    <Col xs={8} className="contribution-border">
                    <Tabs defaultActiveKey="MetaMask" id="controlled-tab-example" className="mb-3">
                    <Tab eventKey="MetaMask" title="MetaMask">
                    <br/>
                    <Form>
                        <Container>
                            <Row>
                                <Col/>
                                <Col>
                                    <Form.Group className="mb-3" controlid="formContributionAmount">
                                        <Form.Label>
                                            Contribution Amount from Wallet
                                        </Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="contributionAmount" 
                                            placeholder="Enter contribution amount to Treasury" 
                                            onChange={e => setContributionAmount(e.target.value)}
                                            defaultValue={contributionAmount}
                                        />
                                        <Form.Text className="text-muted">
                                            You are doing a one time contribution to your Community Treasury. (Denominated in USD)
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col/>
                            </Row>
                            <br/>
                            <Row>
                                <Col/>
                                <Col xs={6}>
                                    <Button style={{margin: "0px 10px"}} onClick={handleContribute}>
                                        Contribute Funds
                                    </Button>
                                    <Button variant="secondary" style={{margin: "0px 10px"}} onClick={handleGetTotalFunds}>
                                        Check Treasury Value
                                    </Button>
                                </Col>
                                <Col/>
                            </Row>
                        </Container>
                    </Form>
                    </Tab>
                    <Tab eventKey="ACH" title="ACH Transfer (Coming Soon)" disabled/>
                    <Tab eventKey="Stripe" title="Stripe to USDC (Polygon) Direct (Coming Soon)" disabled/>
                    <Tab eventKey="Debit" title="Debit Card (Coming Soon)" disabled/>
                </Tabs>
                    </Col>
                    <Col/>
                </Row>
                </div>
            </div>
    )
}

export default Contribute;