import { ethers } from 'ethers';
import {
    TreasuryAddress,
    TreasuryABI
} from '../constants/treasury-const';

function getTreasuryWithSigner() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryABI, provider);
    const signer = provider.getSigner();
    return TreasuryContract.connect(signer);
}

export default getTreasuryWithSigner;