import React, { useEffect, useState } from 'react';
import {
    Container, Row, Col,
    Button,
    Table,
    Modal,
    Form
} from 'react-bootstrap';
import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8000'
})

function Incentives() {
    const [ incentivesList, setIncentivesList ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);

    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);

    useEffect(() => {
        if(incentivesList.length === 0) {
            client.get('/incentives/list')
                .then(response => {
                    setIncentivesList(response.data);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    })

    const handleRefresh = (e) => {
        e.preventDefault();
        client.get('/incentives/list')
                .then(response => {
                    setIncentivesList(response.data);
                    console.log(response.data);
                })
                .catch(err => {
                    console.error(err);
                })
    }

    return(
        <div>
            <Container>
                <Row>
                    <Col style={{textAlign: 'left'}}>
                        <h3>Incentives</h3>
                    </Col>
                    <Col style={{alignItems: 'right'}}>
                        <Button className="casama-primary" onClick={handleModalOpen}>
                            <i className="fa-solid fa-plus"/><span> New Incentive</span>
                        </Button>
                        <Button variant="outline-primary" style={{marginLeft: "16px"}} onClick={handleRefresh} className='casama-outline'>
                            <span>Refresh </span><i className='fa-solid fa-arrows-rotate'/>
                        </Button>
                    </Col>
                </Row>
                <Row style={{marginTop: "32px"}}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Incentive ID</th>
                                <th>Incentive</th>
                                <th>Token Reward</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incentivesList.map(incentive => {
                                return(
                                    <tr key={incentive.id}>
                                        <td>{incentive.id}</td>
                                        <td>{incentive.type}</td>
                                        <td>{incentive.reward}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
            <IncentiveModal showModal={showModal} handleModalClose={handleModalClose} />
        </div>
    )
}

export default Incentives;

function IncentiveModal(props) {
    const [incentiveName, setIncentiveName ] = useState('');
    const [ incentiveReward, setIncentiveReward ] = useState(0);


    const handleIncentiveCreation = (e) => {
        e.preventDefault();
        client.post('/incentives/create', {
            type: incentiveName,
            reward: parseInt(incentiveReward)
        })
            .then(response => {
                console.log(response.data);
                props.handleModalClose()
            })
            .catch(err => {
                console.error(err);
            })
    }
    return(
        <Modal show={props.showModal} onHide={props.handleModalClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Incentive</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Incentive Name</Form.Label>
                        <Form.Control type="text" placeholder='Complete Review' value={incentiveName} onChange={e => setIncentiveName(e.target.value)} autoFocus />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Incentive Reward (in Tokens)</Form.Label>
                        <Form.Control type="number" placeholder="10" value={incentiveReward} onChange={e => setIncentiveReward(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleModalClose}>
                    Close
                </Button>
                <Button variant="primary" className="casama-primary" onClick={handleIncentiveCreation}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
        )
}