import React, {  useEffect, useState} from 'react';
import {
    Container, Row, Col, Table, Button
} from 'react-bootstrap';
import { AreaChart, LineChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import axios from 'axios';
import moment from 'moment';


const client = axios.create({
    baseURL: 'http://localhost:8000'
})

function Dashboard() {
    const [priceData, setPriceData] = useState([
        {
            index: 0,
            tokenPrice: 0.1
        }
    ]);

    const [ distributionData, setDistributionData ] = useState();

    const [recentTransactions, setRecentTransactions ] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = (e) => {
        e.preventDefault();
        setRefreshing(true);
        client.get('/token/transactions')
            .then(res => {
                setRecentTransactions(res.data);
            })
            .catch( err => {
                console.error(err);
            })

        client.get('/token/pricedata')
            .then(res => {
                console.log(res.data);
                setPriceData(res.data);
            })
            .catch(err => {
                console.error(err);
            })

        client.get('/token/distributionData')
            .then(res => {
                console.log(res.data);
                setDistributionData(res.data);
            })
            .catch(err => {
                console.error(err);
            })

        setRefreshing(false);
    }

    useEffect(() => {
        if(recentTransactions.length === 0){
            client.get('/token/transactions')
                .then(response => {
                    setRecentTransactions(response.data);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }, [recentTransactions.length])




    return(
        <div>
            <div style={{textAlign: 'left', marginLeft: "100px"}}>
                <h1>Dashboard</h1>
            </div>
            <Container>
                <Row>
                    <Col md={6}>
                        <h5>Token Price</h5>
                        <TokenPrice data={priceData}/>
                    </Col>
                    <Col md={6}>
                        <h5>Token Distribution</h5>
                        <TokenDistribution data={distributionData}/>
                    </Col>
                </Row>
                <Row style={{margin: "12px 0px"}}>
                    <Col>
                        <h5>
                            Recent Transactions
                        </h5>
                    </Col>
                    <Col>
                        <Button variant="outline-primary" className="casama-outline" onClick={handleRefresh}>    
                            <span>Refresh </span><i className={"fa-solid fa-arrows-rotate" + (refreshing ? " fa-spin" : "")}></i>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map(txn => {
                                return(
                                    <tr>
                                        <td>{txn.to}</td>
                                        <td>{txn.type}</td>
                                        <td>{txn.amount}</td>
                                        <td>{moment(txn.time).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </div>
    );
}

// 

function TokenPrice(props){
        return(
            <AreaChart width={350} height={250} data={props.data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="index"/>
                                <YAxis/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="tokenPrice" stroke="#8884d8" fill="#8884d8"/>
                            </AreaChart>
        )
}

function TokenDistribution(props){
    return(
        <LineChart width={350} height={250} data={props.data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="index"/>
            <YAxis/>
            <Tooltip/>
            <Line type="monotone" dataKey="expected" stroke="#ABB2B9" />
            <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
        </LineChart>
    )
}

export default Dashboard;