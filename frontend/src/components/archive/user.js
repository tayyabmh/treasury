import { ethers } from 'ethers';
import React, { useState } from 'react';
import {
    Container,
    Row, Col,
    Button,
    Form,
    InputGroup,
    FormControl,
    Table
} from 'react-bootstrap';
import { TreasuryABI,TreasuryAddress } from '../constants/treasury-const';

import { useContractRead, useAccount } from 'wagmi';

function User(){
    const [claimableRewards, setClaimableRewards] = useState(0);
    const [accountAddress, setAccountAddress] = useState('');
    const accountInfo = useAccount({
        onSuccess(data) {
            setAccountAddress(data.address);
        }
    });

    const checkClaimableRewards = useContractRead(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        {
            args: accountAddress
        },
        'checkRewards'
    )

    const handleCheckClaimableRewards = async (e) => {
        e.preventDefault();
        const { data } = await checkClaimableRewards.refetch();
        setClaimableRewards(ethers.utils.parseUnits(data,18));
    }


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
                                    <Button variant='outline-primary' onClick={handleCheckClaimableRewards}>
                                        Check Claimable Rewards
                                    </Button>
                                    <FormControl type="text" value={claimableRewards} readOnly />
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


export default User;