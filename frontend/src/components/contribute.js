import { ethers } from "ethers";
import React from "react";
import {
    Button,
    Container,
    Form,
    Col,
    Row
} from 'react-bootstrap';
import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';



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

    //TODO: This is probably wrong haha... but whatever
    async handleContribute(e) {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const signer = provider.getSigner();
        const TreasuryWithSigner = TreasuryContract.connect(signer);
        const transaction = await TreasuryWithSigner.contributeFunds({
            value: ethers.utils.parseEther(this.state.form.contributionAmount.toString())
        })
        console.log("Transaction: ", transaction);
    }

    async handleGetTotalFunds(e) {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const totalFunds = await TreasuryContract.getTotalFunds();
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
                    <Col md={4}>Treasury Value: {this.state.treasuryValue} ETH</Col>
                    <Col md={{ span: 4, offset: 4 }}>
                        
                    </Col>
                </Row>
                
                <br/>
                <div>
                    <Form>
                        <Container>
                            <Row>
                                <Col/>
                                <Col>
                                    <Form.Group className="mb-3" controlid="formContributionAmount">
                                        <Form.Label>
                                            Contribution Amount
                                        </Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="contributionAmount" 
                                            placeholder="Enter contribution amount to Treasury" 
                                            onChange={this.handleContributionChange}
                                            defaultValue={this.state.form.contributionAmount}
                                        />
                                        <Form.Text className="text-muted">
                                            You are doing a one time contribution to your Community Treasury. (Denominated in ETH)
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col/>
                            </Row>
                            <Row>
                                <Col/>
                                <Col>
                                    <Button onClick={this.handleContribute}>
                                        Contribute Funds
                                    </Button>
                                </Col>
                                <Col/>
                            </Row>
                        </Container>
                    </Form>
                    <Button onClick={this.handleGetTotalFunds}>
                        Get Total Funds
                    </Button>
                </div>
            </div>
        );
    }
}

export default Contribute;