import { ethers } from 'ethers';
import React from 'react';
import {
    Container,
    Accordion,
    Form,
    Button,
    Alert
} from 'react-bootstrap';
import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';

class Incentive extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                review: ''
            }
        }

        this.handleReviewChange = this.handleReviewChange.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    }

    handleReviewChange(e) {
        this.setState({
            form: {
                review: e.target.value
            }
        })
    }

    async handleReviewSubmit(e) {
        e.preventDefault();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
        const signer = provider.getSigner();
        const TreasuryWithSigner = TreasuryContract.connect(signer);
        const transaction = await TreasuryWithSigner.rewardTokens(
            '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
            ethers.utils.parseUnits('10.0', 18)
        );
        console.log("Transaction: ", transaction);
        this.setState({
            form: {
                review: ''
            }
        })
    }

    render() {
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
                                <Form.Group classname="mb-3">
                                    <Alert variant="dark">Reward 10 Tokens for completing a review</Alert>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Wallet Address:</Form.Label>
                                    <Form.Control placeholder="0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199" disabled />
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
                                    onChange={this.handleReviewChange}
                                    value={this.state.form.review}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Button onClick={this.handleReviewSubmit}>
                                        Submit Review
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Container>
            </div>
        )
    }
}

export default Incentive;

