const hre = require('hardhat');
const ethers = hre.ethers;

async function main() {
    const USD = await ethers.getContractFactory('USDC');
    const usd = await USD.deploy("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", 1000000);

    await usd.deployed();

    console.log("USD deployed to: ", usd.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })