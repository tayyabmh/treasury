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



let maxSupply = 1_000_000_000;
let circulatingSupply = 0;
let LP_marketplace_token = 100_000;
let LP_USD_token = 10_000;
let tokenPrice = LP_USD_token / LP_marketplace_token;
const K = LP_marketplace_token * LP_USD_token;

let userWallets = [
    {
        id: 1,
        name: "Greg Thompson",
        email: "greg.thompson@gmail.com",
        walletAddress: ethers.Wallet.createRandom().address,
        tokenHoldings: 10
    }
]

let UWindex = 2;

let priceData = [
    {
        index: 0,
        tokenPrice: 0.1
    }
]
let PDIndex = 1;

let transactions_log = [];

let TokenDistributionData = [
    {
        index: 0,
        expected: 0,
        actual: 0
    }
]

let TDindex = 1;

function logTransaction(transactions_log, recentTransaction) {
    return transactions_log.push(recentTransaction);
}


app.get('/', (req,res) => {
    res.send('Hello');
});

app.get('/token/transactions', (req,res) => {
    res.status(200).send(transactions_log);
})

// This doesn't actually deploy to the Liquidity Pool
app.get('/deploy', async (req, res) => {
    const USD = await ethers.getContractFactory("USDC");
    const usd = await USD.deploy('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', 1000000);

    await usd.deployed();

    console.log("Treasury deployed to: ", usd.address);

    res.send("Done.")
});

app.post('/wallets/create', (req, res) => {
    const wallet = req.body;
    let temp_wallet_obj = {
        id: UWindex++,
        name: wallet.name,
        email: wallet.email,
        walletAddress: ethers.Wallet.createRandom().address,
        tokenHoldings: 0
    }
    userWallets.push(temp_wallet_obj);
    
    res.status(200).send(temp_wallet_obj);
})

app.get('/wallets/list', (req, res) => {
    res.status(200).send(userWallets);
})

app.get('/token/pricedata', (req,res) => {
    res.status(200).send(priceData);
})

app.get('/token/distributionData', (req,res) => {
    res.status(200).send(TokenDistributionData);
})

// TODO: Error handling when id is out of array
app.get('/wallets/list/:id', (req, res) => {
    const walletId = req.params.id;
    const temp_wallet_obj = userWallets.find(wallet => wallet.id.toString() === walletId);
    res.status(200).send(temp_wallet_obj);
})

app.post('/token/distribute/:id', (req, res) => {
    const walletId = req.params.id;
    const distributionAmount = req.body.amount;
    circulatingSupply += distributionAmount;
    let tempWallet = userWallets.find(wallet => wallet.id.toString() === walletId);
    tempWallet.tokenHoldings += distributionAmount;

    let distributionDataPoint = {
        index: TDindex,
        expected: TokenDistributionData[TDindex - 1].expected + 50,
        actual: TokenDistributionData[TDindex -1].actual + distributionAmount
    }

    TokenDistributionData.push(distributionDataPoint);
    TDindex++;

    let recentTransaction = {
        "to": tempWallet.name,
        "type": "DISTRIBUTION",
        "amount": distributionAmount,
        "time": Date.now()
    }
    logTransaction(transactions_log, recentTransaction);
    res.status(200).send();
})

app.post('/token/sell/:id', (req,res) => {
    const walletId = req.params.id;
    const saleAmount = req.body.amount;
    let tempWallet = userWallets.find(wallet => wallet.id.toString() === walletId);
    if(saleAmount > tempWallet.tokenHoldings) {
        res.status(200).send("You are trying to sell more than you have, please try a smaller amount.");
    } else {
        // Liquidity Pool logic
        tempWallet.tokenHoldings -= saleAmount;
        LP_marketplace_token += saleAmount;
        let prevUSDAmount = LP_USD_token;
        LP_USD_token = K / LP_marketplace_token;
        let userPayout = prevUSDAmount - LP_USD_token;
        tokenPrice = LP_USD_token/LP_marketplace_token;
        console.log(LP_marketplace_token);
        console.log(LP_USD_token);
        console.log(tokenPrice);
        console.log(userPayout);

        let newPriceData = {
            index: PDIndex,
            tokenPrice: tokenPrice
        }
        PDIndex++;
        priceData.push(newPriceData);

        let recentTransaction = {
            "to": tempWallet.name,
            "type": "PAYOUT",
            "amount": userPayout,
            "time": Date.now()
        }
        logTransaction(transactions_log, recentTransaction);
        res.status(200).send("Sold!")
    }

})

app.get('/token/circulating_supply', (req,res) => {
    res.status(200).send({
        "circulatingSupply": circulatingSupply
    })
})

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