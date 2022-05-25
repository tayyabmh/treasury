import { ethers } from 'ethers';
import React from 'react';
import {
    Card,
    Container,
    Button,
    Row,
    Col,
    ProgressBar,
    Form
} from 'react-bootstrap';
import {getTreasuryWithSigner} from '../../utils/ethers-helpers';

class Governance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVote: false,
            totalVotesAvailable: 0,
            totalVotesMade: 60,
            noVotes: 20,
            yesVotes: 40,
            voteSelect: "For"
        }

        this.handleShowVote = this.handleShowVote.bind(this);
        this.handleVoteChange = this.handleVoteChange.bind(this);
        this.handleVoteSubmit = this.handleVoteSubmit.bind(this);
    }

    async handleShowVote(e) {
        e.preventDefault();
        this.setState({
            showVote: true
        })
        const TreasuryWithSigner = getTreasuryWithSigner();
        const txn = await TreasuryWithSigner.getCirculatingSupply();
        console.log("TXN: ", txn);
        this.setState({
            totalVotesAvailable: ethers.utils.formatUnits(txn, 18)
        })
        console.log(this.state.showVote);
    }

    handleVoteChange(e) {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            voteSelect: e.target.value
        })
    }

    handleVoteSubmit(e) {
        e.preventDefault();
        if(this.state.voteSelect === "For") {
            this.setState((prevState, props) => ({
                yesVotes: prevState.yesVotes + 2
            }))
        } else {
            this.setState((prevState, props) => ({
                noVotes: prevState.noVotes + 2
            }))
        }
        
    }

    render() {
        return (
            <div>
                <h1>Govern</h1>
                <Container>
                    <Row>
                        <Col sm={4}>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src="./uniswap.png"/>
                        <Card.Body>
                            <Card.Title>Provide Liquidity to Uniswap for 4% return</Card.Title>
                            <Card.Text>
                                Provide 10K tokens into a Uniswap Liquidity Pool to boost market liquidity and earn a 4% return for the Treasury.
                            </Card.Text>
                                <Button variant="primary" onClick={this.handleShowVote}>
                                    Vote
                                </Button>
                        </Card.Body>
                    </Card>

                        </Col>
                        
                        {this.state.showVote 
                        ? <Col sm={8}>
                            <p>For</p>
                            <ProgressBar striped variant="success" now={this.state.yesVotes} label={`${this.state.yesVotes}%`}/>
                            <p>Against</p>
                            <ProgressBar striped variant="danger" now={this.state.noVotes}  label={`${this.state.noVotes}%`} />
                            <br/>
                            <Form>
                                <Form.Label>Cast Your Vote</Form.Label>
                                <Form.Select
                                    onChange={this.handleVoteChange}
                                    value={this.state.voteSelect}
                                >
                                    <option value="For">For</option>
                                    <option value="Against">Against</option>
                                </Form.Select>
                                <br/>
                                <Button onClick={this.handleVoteSubmit} style={{width: "24rem"}}>
                                    Vote
                                </Button>
                            </Form>
                        </Col> 
                        : null }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Governance;
