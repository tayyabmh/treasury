pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AMM {

    address public MARKETPLACE_TOKEN;
    address public USD_TOKEN;

    using SafeMath for uint256;

    uint256 totalShares; // Total shares locked
    uint256 totalToken1; // Shares locked of token 1
    uint256 totalToken2; // Shares locked of token 2

    uint256 constant PRECISION = 1_000_000_000_000_000_000;

    mapping(address => uint256) shares; // Stores the share holding of each provider (will only be one to begin with)

    mapping(address => uint256) token1Balance; // Stores the available balance of user outside of AMM (might not need)
    mapping(address => uint256) token2Balance;

    // Ensures that the quantity is non-zero and user has enough
    modifier validAmountCheck(address _tokenAddress, uint256 _qty) {
        require(_qty >0, "Amount cannot be zero!");
        require(_qty <= IERC20(_tokenAddress).balanceOf(address(msg.sender)), "Insufficient Amount");
        _;
    }

    // Restricts withdraw, swap feature until liquidity is added to the pool
    modifier activePool() {
        require(totalShares >0, "Zero liqudity");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can access this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function setTreasuryTokenContractAddress(address _tokenContractAddress) public onlyOwner {
        MARKETPLACE_TOKEN = _tokenContractAddress;
    }

    function setUSDTokenContractAddress(address _tokenContractAddress) public  onlyOwner {
        USD_TOKEN = _tokenContractAddress;
    }

    // Returns balance of user
    function getMyHoldings() external view returns(uint256 amountToken1, uint256 amountToken2, uint256 myShare) {
        amountToken1 = IERC20(MARKETPLACE_TOKEN).balanceOf(address(msg.sender));
        amountToken2 = IERC20(USD_TOKEN).balanceOf(address(msg.sender));
        myShare = shares[msg.sender];
    }

    // Returns thte total amount of tokens in the pool and the total shares issued corresponding to it
    function getPoolDetails() external view returns(uint256, uint256, uint256) {
        return (totalToken1, totalToken2, totalShares);
    }

    // Adding new liquidty to the pool 
    // TODO: How do I incorporate ERC20 code into this
        // I need to make sure they are providing the right amount of both tokens, and then complete the transfer
        // So I need to get approval from the 
        // Just solve this and then move on to building an API version that is fake
        // Or just move on since you've stopped
    function provide(uint256 _amountToken1, uint256 _amountToken2) external validAmountCheck(MARKETPLACE_TOKEN, _amountToken1) validAmountCheck(USD_TOKEN, _amountToken2) returns (uint256 share) {
        if (totalShares == 0) { // Gensis liquidity is issued 100 shares
            share = 100 * PRECISION;
        } else {
            uint256 share1 = totalShares.mul(_amountToken1).div(totalToken1);
            uint256 share2 = totalShares.mul(_amountToken2).div(totalToken2);
            require(share1 == share2, "Equivalent value of tokens not provided...");
            share = share1;
        }

        require(share > 0, "Asset value less than threshold for contribution!");
        require(IERC20(MARKETPLACE_TOKEN).balanceOf(address(msg.sender)) >= _amountToken1, "You do not have enough of Marketplaces tokens.");
        require(IERC20(USD_TOKEN).balanceOf(address(msg.sender)) >= _amountToken2, "You do not have enough USD.");

        

        // Likely won't need this
        token1Balance[msg.sender] -= _amountToken1;
        token2Balance[msg.sender] -= _amountToken2;

        totalToken1 += _amountToken1;
        totalToken2 += _amountToken2;

        K = totalToken1.mul(totalToken2);

        totalShares += share;
        shares[msg.sender] += share;
    }

    function getEquivalentToken1Estimate(uint256 _amountToken2) public view activePool returns(uint256 reqToken1) {
        reqToken1 = totalToken1.mul(_amountToken2).div(totalToken2);
    }

    function getEquivalentToken2Estimate(uint256 _amountToken1) public view activePool returns(uint256 reqToken2) {
        reqToken2 = totalToken2.mul(_amountToken1).div(totalToken1);
    }

    //Maybe need it, maybe not
    function getWithdrawEstimate(uint256 _share) public view activePool returns(uint256 amountToken1, uint256 amountToken2) {
        require(_share <= totalShares, "Share should be less than total Shares");
        amountToken1 = _share.mul(totalToken1).div(totalShares);
        amountToken2 = _share.mul(totalToken2).div(totalShares);
    }

    // removes liquidity from pool and releases corresponding tokens to withdrawer
    function withdraw(uint256 _share) external activePool validAmountCheck(shares, _share) returns(uint256 amountToken1, uint256 amountToken2) {
        (amountToken1, amountToken2) = getWithdrawEstimate(_share);

        shares[msg.sender] -= _share;
        totalShares -= _share;

        totalToken1 -= amountToken1;
        totalToken2 -= amountToken2;

        K = totalToken1.mul(totalToken2);

        token1Balance[msg.sender] += amountToken1;
        token2Balance[msg.sender] += amountToken2;
    }

    // Returns the amount of Token2 that th euser will get when swapping a given amount of Token1 for Token2
    function getSwapToken1Estimate(uint256 _amountToken1) public view activePool returns(uint256 amountToken2) {
        uint256 token1After = totalToken1.add(_amountToken1);
        uint256 token2After = K.div(token1After);
        amountToken2 = totalToken2.sub(token2After);

        // To ensure that Token2's pool is not completely depleting leading to inf:0 ratio
        if(amountToken2 == totalToken2) amountToken2--;
    }

    // Returns the amount of Token1 that the user should swap to get _amountToken2 in return
    function getSwapToken1EstimateGivenToken2(uint256 _amountToken2) public view activePool returns(uint256 amountToken1) {
        require(_amountToken2 > totalToken2, "Insufficient Pool balance");
        uint256 token2After = totalToken2.sub(amountToken2);
        uint256 token1After = K.div(token2After);
        amountToken1 = token1After.sub(totalToken1);
    }

    // Swaps given amount of Token1 to Token2 using K product method
    function swapToken1(uint256 _amountToken1) external activePool validAmountCheck(token1Balance, _amountToken1) returns(uint256 amounToken) {
        amountToken2 = getSwapToken1Estimate(_amountToken1);

        token1Balance[msg.sender] -= _amountToken1;
        totalToken1 += _amountToken1;
        totalToken2 -= amountToken2;
        token2Balance[msg.sender] += amountToken2;
    }

    
    // Returns the amount of Token2 that the user will get when swapping a given amount of Token1 for Token2
    function getSwapToken2Estimate(uint256 _amountToken2) public view activePool returns(uint256 amountToken1) {
        uint256 token2After = totalToken2.add(_amountToken2);
        uint256 token1After = K.div(token2After);
        amountToken1 = totalToken1.sub(token1After);

        // To ensure that Token1's pool is not completely depleted leading to inf:0 ratio
        if(amountToken1 == totalToken1) amountToken1--;
    }

    // Returns the amount of Token2 that the user should swap to get _amountToken1 in return
    function getSwapToken2EstimateGivenToken1(uint256 _amountToken1) public view activePool returns(uint256 amountToken2) {
        require(_amountToken1 < totalToken1, "Insufficient pool balance");
        uint256 token1After = totalToken1.sub(_amountToken1);
        uint256 token2After = K.div(token1After);
        amountToken2 = token2After.sub(totalToken2);
    }

    // Swaps given amount of Token2 to Token1 using algorithmic price determination
    function swapToken2(uint256 _amountToken2) external activePool validAmountCheck(token2Balance, _amountToken2) returns(uint256 amountToken1) {
        amountToken1 = getSwapToken2Estimate(_amountToken2);

        token2Balance[msg.sender] -= _amountToken2;
        totalToken2 += _amountToken2;
        totalToken1 -= amountToken1;
        token1Balance[msg.sender] += amountToken1;
    }


}