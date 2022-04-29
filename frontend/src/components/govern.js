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

class Governance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVote: false
        }

        this.handleShowVote = this.handleShowVote.bind(this);
    }

    handleShowVote(e) {
        e.preventDefault();
        this.setState({
            showVote: true
        })
        console.log(this.state.showVote);
    }

    render() {
        return (
            <div>
                <h1>Govern</h1>
                <Container>
                    <Row>
                        <Col sm={4}>
                    <Card style={{width: '18rem'}}>
                        <Card.Img variant="top" src="https://via.placeholder.com/100x80"/>
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
                            <ProgressBar striped variant="success" now={40}/>
                            <p>Against</p>
                            <ProgressBar striped variant="danger" now={20} />
                            <br/>
                            <Form>
                                <Form.Label>Cast Your Vote</Form.Label>
                                <Form.Select>
                                    <option value="For">For</option>
                                    <option value="Against">Against</option>
                                </Form.Select>
                                <br/>
                                <Button style={{width: "24rem"}}>
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
