import { ethers } from 'ethers';
import React from 'react';
import {
    Container,
    Form,
    Button,
    Col,
    Row,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addressSelect: '',
            rewardBalance: 0,
            circulatingSupply: 0,
            availableSupply: 0
        }
        
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleCheckRewardsBalance = this.handleCheckRewardsBalance.bind(this);
        this.handleDistributeRewards = this.handleDistributeRewards.bind(this);
        this.checkAvailableSupply = this.checkAvailableSupply.bind(this);
        this.checkCirculatingSupply = this.checkCirculatingSupply.bind(this);
    }


    async checkAvailableSupply(e) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const signer = provider.getSigner();
        const TreasuryWithSigner = TreasuryContract.connect(signer);
        //TODO: replace with treasury address
        const transaction = await TreasuryWithSigner.getAvailableSupply();
        console.log("Transaction: ", transaction);
        this.setState({
            availableSupply: ethers.utils.formatUnits(transaction, 18).toString()
        })
    }

    async checkCirculatingSupply(e) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const signer = provider.getSigner();
        const TreasuryWithSigner = TreasuryContract.connect(signer);
        //TODO: replace with treasury address
        const transaction = await TreasuryWithSigner.getCirculatingSupply();
        console.log("Transaction: ", transaction);
        this.setState({
            circulatingSupply: ethers.utils.formatUnits(transaction,18).toString()
        })
    }

    handleSelectChange(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            addressSelect: e.target.value
        })
    }

    async handleCheckRewardsBalance(e) {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const signer = provider.getSigner();
        const TreasuryWithSigner = TreasuryContract.connect(signer);
        const transaction = await TreasuryWithSigner.checkRewards(this.state.addressSelect);
        console.log("Transaction: ", transaction);
        this.setState({
            rewardBalance: ethers.utils.formatUnits(transaction, 18)
        })
    }

    async handleDistributeRewards(e) {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const signer = provider.getSigner();
        const TreasuryWithSigner = TreasuryContract.connect(signer);
        const transaction = await TreasuryWithSigner.distributeRewards(this.state.addressSelect);
        console.log("TXN: ", transaction);
        this.setState({
            rewardBalance: 0
        });
    }

    render() {
        return(
            <div>
                <h1>Control Panel</h1>                
                <br/>
                <Container>
                    <Row>
                        <Col className='contribution-border' style={{margin: "10px"}}>
                        <Form>
                            <h4>User Rewards</h4>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Address/User</Form.Label>
                            <Form.Select
                                onChange={this.handleSelectChange}
                                value={this.state.addressSelect}
                            >
                                <option value=''></option>
                                <option value="0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199">Greg Jameson &lt;greg.jameson@gmail.com&gt;</option>
                                <option value="0xdd2fd4581271e230360230f9337d5c0430bf44c0">Susan Patrick &lt;Susan.Patrick@gmail.com&gt;</option>
                                <option value="0xbda5747bfd65f08deb54cb465eb87d40e51b197e">William Bolingreen &lt;Will.B@gmail.com&gt;</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Button onClick={this.handleCheckRewardsBalance}>
                                Check Reward Balance
                            </Button>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Button onClick={this.handleDistributeRewards}>
                                Distribute Rewards
                            </Button>
                        </Form.Group>
                    </Form>
                    <p>Undistributed Reward Balance for Selected User: {this.state.rewardBalance} TREASURE</p>
                    </Col>
                    <Col className='contribution-border' style={{margin: "10px"}}>
                        <h4>Check-in on Token Supply</h4>
                        <Form>
                            <InputGroup className='mb-3'>
                                <Button variant='outline-primary' onClick={this.checkCirculatingSupply}>
                                    Check Total Circulating Supply
                                </Button>
                                <FormControl type="text" value={this.state.circulatingSupply}  readOnly/>
                                <InputGroup.Text>Treasure Tokens</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Button variant='outline-primary' onClick={this.checkAvailableSupply}>
                                    Check Total Available Supply
                                </Button>
                                <FormControl type="text" value={this.state.availableSupply} readOnly/>
                                <InputGroup.Text>Treasure Tokens</InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }
}


export default Admin;