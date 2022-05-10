const hre = require('hardhat');
const ethers = hre.ethers;


async function main() {
    const Treasury = await ethers.getContractFactory("Treasury");
    const treasury = await Treasury.deploy();

    await treasury.deployed();

    console.log("Treasury deployed to: ", treasury.address);

    const USD = await ethers.getContractFactory("USDC");
    const usd = await USD.deploy("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", 1000000);

    await usd.deployed();

    console.log("USD deployed to: ", usd.address);
    await treasury.setUSDTokenContractAddress(usd.address);

    const Token = await ethers.getContractFactory("KToken");
    const token = await Token.deploy(treasury.address, 1000000000000000);

    await token.deployed();
    
    console.log("Treasure Token deployed to: ", token.address);
    await treasury.setTreasuryTokenContractAddress(token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })