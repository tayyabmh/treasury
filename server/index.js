const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hre = require('hardhat');
const ethers = hre.ethers;


const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let token_info = {
    tokenName: '',
    tokenTicker: ''
}

let liquidity_settings = {
    tokenQuantity: 0,
    tokenBasePrice: 0,
    dollarCollateral: 0
}


app.get('/', (req,res) => {
    res.send('Hello');
});

// This doesn't actually deploy to the Liquidity Pool
app.get('/deploy', async (req, res) => {
    const USD = await ethers.getContractFactory("USDC");
    const usd = await USD.deploy('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 1000000);

    await usd.deployed();

    console.log("Treasury deployed to: ", usd.address);

    res.send("Done.")
});

app.post('/setup', (req, res) => {
    const token = req.body;
    token_info.tokenName = token.tokenName;
    token_info.tokenTicker = token.tokenTicker;
    console.log(token_info);
})

app.post('/liquidity', (req,res) => {
    const liquidity = req.body;
    liquidity_settings.tokenQuantity = liquidity.tokenQuantity;
    liquidity_settings.tokenBasePrice = liquidity.tokenBasePrice;
    liquidity_settings.dollarCollateral = liquidity.requiredBacking;
    console.log(liquidity_settings);
})

app.get('/token_info', (req,res) => {
    res.send(token_info)
})

app.get('/liquidity_info', (req,res) => {
    res.send(liquidity_settings);
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));