import { ethers } from 'ethers';
import React, {useState} from 'react';
import {
    Container,
    Accordion,
    Form,
    Button,
    Alert,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';
import { useContractWrite } from 'wagmi';
function Incentive() {
    const [review, setReview ] = useState('');
    const [referralEmail, setReferralEmail ] = useState('');
    
    const referralIncentive = useContractWrite(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        'rewardTokens',
        {
            args: ['0xdd2fd4581271e230360230f9337d5c0430bf44c0', ethers.utils.parseUnits('25.0', 18)]
        }
    )

    const reviewIncentive = useContractWrite(
        {
            addressOrName: TreasuryAddress,
            contractInterface: TreasuryABI
        },
        'rewardTokens',
        {
            args: ['0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199', ethers.utils.parseUnits('10.0', 18)]
        }
    )

    const handleReviewSubmit = async(e) => {
        e.preventDefault();
        reviewIncentive.write()
    }

    const handleReferralSubmit = async(e) => {
        e.preventDefault();
        referralIncentive.write();
    }


        return (
            <div>
                <h1>
                    Incentivize
                </h1>
                <Container>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Incentive Example #1 - Rewards for completing reviews</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Alert variant="dark">Reward 10 Tokens for completing a review</Alert>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>You:</Form.Label>
                                    <Form.Control placeholder="Greg Jameson <Greg.Jameson@gmail.com>" disabled />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Review For:</Form.Label>
                                    <Form.Control placeholder="Jane Doe" disabled />
                                </Form.Group>
                                {/* <Form.Group className="mb-3">
                                    <Form.Label>Provide a rating for the service provided</Form.Label>
                                    
                                </Form.Group> */}
                                <Form.Group className="mb-3">
                                    <Form.Label>Write your Review</Form.Label>
                                    <Form.Control 
                                    as="textarea"
                                    onChange={e => setReview(e.target.value)}
                                    value={review}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Button onClick={handleReviewSubmit}>
                                        Submit Review
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Incentive Example #2 - Rewards for referring a friend</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Alert variant='dark'>Reward 25 Tokens for referring a friend to the platform</Alert>
                            </Form>
                            <Form.Group className="mb-3">
                                <Form.Label>You:</Form.Label>
                                <Form.Control placeholder="Susan Patrick <Susan.Patrick@gmail.com>" disabled />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <InputGroup className='mb-3'>
                                    <FormControl
                                        placeholder="Enter email here"
                                        onChange={e => setReferralEmail(e.target.value)}
                                        value={referralEmail}
                                    />
                                    <Button variant='outline-primary' id="button-addon1" onClick={handleReferralSubmit}>
                                        Submit
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Container>
            </div>
        )
    }


export default Incentive;

