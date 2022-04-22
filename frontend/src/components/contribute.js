import { ethers } from "ethers";
import React from "react";
import {
    Button,
    Container,
    Form,
    Col,
    Row
} from 'react-bootstrap';

const TreasuryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const TreasuryABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "contributeFunds",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTotalFunds",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

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
        this.handleConnectWallet = this.handleConnectWallet.bind(this);
        this.handleContributionChange = this.handleContributionChange.bind(this);
        this.handleGetTotalFunds = this.handleGetTotalFunds.bind(this);
    }

    async handleConnectWallet(e) {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
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
                        <Button onClick={this.handleConnectWallet}>
                            Connect Wallet
                        </Button>
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