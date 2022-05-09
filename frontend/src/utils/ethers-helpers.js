import { ethers } from 'ethers';
import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';
import {
    USD_Address,
    USD_ABI
} from '../constants/usd-const';

function getTreasuryWithSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
    const signer = provider.getSigner();
    return TreasuryContract.connect(signer);
}

function getUSDWithSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const USDContract = new ethers.Contract(USD_Address, USD_ABI, provider);
    const signer = provider.getSigner();
    return USDContract.connect(signer);
}



export {
    getTreasuryWithSigner,
    getUSDWithSigner
}