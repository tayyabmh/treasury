import { ethers } from 'ethers';
import React, {useState} from 'react';
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
import { useContractRead, useContractWrite } from 'wagmi';

function Admin() {
    const [addressSelect, setAddressSelect] = useState('');
    const [rewardBalance, setRewardBalance] = useState(0);
    const [ circulatingSupply, setCirculatingSupply] = useState(0);
    const [ availableSupply, setAvailableSupply ] = useState(0);

    const getAvailableSupply = useContractRead(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        'getAvailableSupply'
    )

    const getCirculatingSupply = useContractRead(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        'getCirculatingSupply'
    )

    const getUserRewardsBalance = useContractRead(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        'checkRewards',
        {
            args: addressSelect
        }
    )

    const distributeRewards = useContractWrite(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        'distributeRewards',
        {
            args: addressSelect
        }
    )


    const handleCheckAvailableSupply = async (e) => {
        e.preventDefault();
        const {data} = await getAvailableSupply.refetch();
        setAvailableSupply(ethers.utils.formatUnits(data, 18));
    }

    const handleCheckCirculatingSupply = async (e) => {
        e.preventDefault();
        const { data } = await getCirculatingSupply.refetch();
        setCirculatingSupply(ethers.utils.formatUnits(data,18));
    }

    const handleCheckRewards = async (e) => {
        e.preventDefault();
        const { data } = await getUserRewardsBalance.refetch();
        setRewardBalance(ethers.utils.formatUnits(data, 18));
    }

    const handleDistributeRewards = async(e) => {
        e.preventDefault();
        distributeRewards.write();
        setRewardBalance(0);
    }
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
                                onChange={e => setAddressSelect(e.target.value)}
                                value={addressSelect}
                            >
                                <option value=''></option>
                                <option value="0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199">Greg Jameson &lt;greg.jameson@gmail.com&gt;</option>
                                <option value="0xdd2fd4581271e230360230f9337d5c0430bf44c0">Susan Patrick &lt;Susan.Patrick@gmail.com&gt;</option>
                                <option value="0xbda5747bfd65f08deb54cb465eb87d40e51b197e">William Bolingreen &lt;Will.B@gmail.com&gt;</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Button onClick={handleCheckRewards}>
                                Check Reward Balance
                            </Button>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Button onClick={handleDistributeRewards}>
                                Distribute Rewards
                            </Button>
                        </Form.Group>
                    </Form>
                    <p>Undistributed Reward Balance for Selected User: {rewardBalance} TREASURE</p>
                    </Col>
                    <Col className='contribution-border' style={{margin: "10px"}}>
                        <h4>Check-in on Token Supply</h4>
                        <Form>
                            <InputGroup className='mb-3'>
                                <Button variant='outline-primary' onClick={handleCheckCirculatingSupply}>
                                    Check Total Circulating Supply
                                </Button>
                                <FormControl type="text" value={circulatingSupply}  readOnly/>
                                <InputGroup.Text>Treasure Tokens</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <Button variant='outline-primary' onClick={handleCheckAvailableSupply}>
                                    Check Total Available Supply
                                </Button>
                                <FormControl type="text" value={availableSupply} readOnly/>
                                <InputGroup.Text>Treasure Tokens</InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Col>
                    </Row>
                    
                </Container>
            </div>
        );
    }



export default Admin;