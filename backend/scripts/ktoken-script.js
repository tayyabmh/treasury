const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const KToken = await ethers.getContractFactory("KToken");
    const ktoken = await KToken.deploy("0x5FbDB2315678afecb367f032d93F642f64180aa3", 1000000000000000);

    await ktoken.deployed();

    console.log("KToken deployed to: ", ktoken.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })