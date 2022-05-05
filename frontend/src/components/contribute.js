import { ethers } from "ethers";
import React from "react";
import {
    Button,
    Container,
    Form,
    Col,
    Row,
    Tabs,
    Tab
} from 'react-bootstrap';
import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';

import { getUSDWithSigner } from '../utils/ethers-helpers';

class Contribute extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                contributionAmount: 0
            },
            treasuryValue: 0
        }

        this.handleContribute = this.handleContribute.bind(this);
        this.handleContributionChange = this.handleContributionChange.bind(this);
        this.handleGetTotalFunds = this.handleGetTotalFunds.bind(this);
    }

    //TODO: This is probably unsafe haha... but whatever
    // TODO: Something is also resulting in a Treasury.<unrecognized_selector> situation here as well... not sure what it is though.
    async handleContribute(e) {
        e.preventDefault();
        const USDWithSigner = getUSDWithSigner();
        const transaction = await USDWithSigner.transfer(
            TreasuryAddress,
            ethers.utils.parseUnits(this.state.form.contributionAmount.toString(), 18)
        )
        console.log("Transaction: ", transaction);
    }

    async handleGetTotalFunds(e) {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const totalFunds = await TreasuryContract.getUSDBalance();
        console.log(ethers.utils.formatUnits(totalFunds,18));
        this.setState({
            treasuryValue: ethers.utils.formatUnits(totalFunds,18)
        })
    }

    handleContributionChange(e) {
        let fieldName = e.target.name;
        let fieldVal = e.target.value;
        console.log(e.target.value);
        this.setState({
            form: {
                ...this.state.form, [fieldName]:fieldVal
            }
        })
    }

    render() {
        return (
            <div>
                <Row>
                    <Col><h5>Treasury Value:</h5> {this.state.treasuryValue} USD</Col>
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
                                            onChange={this.handleContributionChange}
                                            defaultValue={this.state.form.contributionAmount}
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
                                    <Button style={{margin: "0px 10px"}} onClick={this.handleContribute}>
                                        Contribute Funds
                                    </Button>
                                    <Button style={{margin: "0px 10px"}} onClick={this.handleGetTotalFunds}>
                                        Check Treasury Value
                                    </Button>
                                </Col>
                                <Col/>
                            </Row>
                        </Container>
                    </Form>
                    </Tab>
                    <Tab eventKey="ACH" title="ACH Transfer (Coming Soon)" disabled/>
                    <Tab eventKey="Stripe" title="Stripe to USDC (Polygon) Direct (Coming Soon" disabled/>
                    <Tab eventKey="Debit" title="Debit Card (Coming Soon)" disabled/>
                </Tabs>
                    </Col>
                    <Col/>
                </Row>
                </div>
            </div>
        );
    }
}

export default Contribute;