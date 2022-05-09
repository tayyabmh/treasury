import { ethers } from 'ethers';
import React from 'react';
import {
    Container,
    Row, Col,
    Button,
    Form,
    InputGroup,
    FormControl,
    Table
} from 'react-bootstrap';
import { getTreasuryWithSigner } from '../utils/ethers-helpers';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ClaimableRewards: 0
        }

        this.checkClaimableRewards = this.checkClaimableRewards.bind(this);
    }

    async checkClaimableRewards(e) {
        e.preventDefault();
        const TreasuryWithSigner = getTreasuryWithSigner();
        const txn = await TreasuryWithSigner.checkRewards('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
        console.log(txn);
        this.setState({
            ClaimableRewards: ethers.utils.formatUnits(txn, 18)
        })
    }


    render() {
        return (
            <div>
                <h1>User Dashboard</h1>
                <Container>
                    <Row>
                        <Col className='contribution-border' style={{margin: "10px"}}>
                            <h4>
                            Profile
                            </h4>
                            <Form>
                                <InputGroup className='mb-3'>
                                    <Button variant='outline-primary' onClick={this.checkClaimableRewards}>
                                        Check Claimable Rewards
                                    </Button>
                                    <FormControl type="text" value={this.state.ClaimableRewards} readOnly />
                                    <InputGroup.Text>Treasure Tokens</InputGroup.Text>
                                </InputGroup>
                            </Form>
                            <h6 style={{textAlign: 'initial'}}>Incentive Milestones</h6>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Incentive</th>
                                        <th>Current Status</th>
                                        <th>Goal</th>
                                        <th>Reward</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Projects Completed</td>
                                        <td>8</td>
                                        <td>10</td>
                                        <td>100 Treasure Tokens</td>
                                    </tr>
                                    <tr>
                                        <td>Successful Referrals</td>
                                        <td>4</td>
                                        <td>5</td>
                                        <td>150 Treasure Tokens</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col className='contribution-border' style={{margin: "10px"}}>
                            <h4>Actions (Coming Soon)</h4>
                            <br/>
                            <Button disabled style={{margin: '10px', width: '300px'}}>
                                Redeem Tokens for Cash
                            </Button>
                            <br/>
                            <Button disabled style={{margin: '10px', width: '300px'}}>
                                Submit Community Proposal
                            </Button>
                            <br/>
                            <Button disabled style={{margin: '10px', width: '300px'}}>
                                Vote for Community Proposals
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default User;