import React, { useState} from 'react';
import {
    Container, Row, Col,
    InputGroup,
    Form,
    Button,
    FormControl
} from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';


function Dashboard() {
    const [data, setData] = useState([
        {
            name: 0,
            funds: 10,
            tokenPrice: 0.1
        }
    ]);
    const [dataIndex, setDataIndex] = useState(0);
    const [fundsToAdd, setFundsToAdd] = useState(0);
    const [tokensToBuy, setTokensToBuy] = useState(0);
    const [MarketplaceTokens, setMarketplaceTokens] = useState(1_000_000);
    const [USDToken, setUSDToken ] = useState(100_000);
    const [ tokenPrice, setTokenPrice] = useState(0.1);

    const K = MarketplaceTokens * USDToken;

    const handleFundsAddition = (e) => {
        e.preventDefault();
        setData(data => [...data, {
            name: dataIndex + 1,
            funds: data[dataIndex].funds + parseInt(fundsToAdd),
            tokenPrice: data[dataIndex].tokenPrice
        }]);
        setDataIndex(dataIndex => dataIndex +1);
    }

    const handleBuynBurn = (e) => {
        e.preventDefault();
        setUSDToken(USDToken => USDToken + tokensToBuy);
        setMarketplaceTokens(MarketplaceTokens => K/MarketplaceTokens);
        // So what's the new price of the Marketplace Token
        //TODO: underrstand this price change
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <Container>
                <Row>
                    <Col>
                    <h4>Treasury Funds</h4>
                    <FundsChart data={data}/>
                        
                    </Col>
                    <Col>
                    <h4>Token Price</h4>
                    <TokenPrice data={data}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Treasury Actions
                        <Form>
                            <InputGroup className='mb-3'>
                                <FormControl 
                                    placeholder="Funds to add to treasury"
                                    value={fundsToAdd}
                                    type="number"
                                    onChange={e => setFundsToAdd(e.target.value)}
                                />
                                <Button variant="outline-primary" id="addToTreasury" onClick={handleFundsAddition}>
                                    Add Funds
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col>
                        Token Actions
                        <Form>
                            <InputGroup className='mb-3'>
                                <FormControl 
                                    placeholder="$ Amount of Tokens to Burn"
                                    value={tokensToBuy}
                                    onChange={e => setTokensToBuy(e.target.value)}
                                />
                                <Button variant="outline-primary" id="buyNBurn" onClick={handleBuynBurn}>
                                    Buy & Burn
                                </Button>
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <FormControl placeholder="How much LP to add"/>
                                <Button variant="outline-primary" id="LP">
                                    Add to Liquidity Pool
                                </Button>
                            </InputGroup>
                            <InputGroup>
                                <FormControl placeholder='How many tokens a user sells'/>
                                <Button variant="outline-primary" id="userSell">
                                    Sell
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

function FundsChart(props)  {
        return(
                            <AreaChart width={500} height={400} data={props.data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="funds" stroke="#8884d8" fill="#8884d8"/>
                            </AreaChart>

        );
}

function TokenPrice(props){
        return(
            <AreaChart width={500} height={400} data={props.data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Area type="monotone" dataKey="tokenPrice" stroke="#8884d8" fill="#8884d8"/>
                            </AreaChart>
        )
}

export default Dashboard;