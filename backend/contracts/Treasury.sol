// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Treasury {

    //TODO: I got the basic version working, but to really get it to be right I need to figure out this whole decimal thing, I'm doing something wrong obviously.

    address public TREASURY_TOKEN;

    address public owner;
    uint totalFunds;
    mapping (address => uint256) public rewardBalances;

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can access this function");
        _;
    }

    constructor () {
        owner = msg.sender;
        totalFunds = 0;
    }

    function setTreasuryTokenContractAddress(address _tokenContractAddress) public onlyOwner {
        TREASURY_TOKEN = _tokenContractAddress;
    }

    function contributeFunds() payable public onlyOwner {
        totalFunds += msg.value;      
    }

    function rewardTokens(address _user, uint256 _amount) public onlyOwner {
        rewardBalances[_user] += _amount;
    }

    function checkRewards(address _user) view public returns (uint256) {
        return rewardBalances[_user];
    }

    function distributeRewards(address _user) public onlyOwner {
        require(IERC20(TREASURY_TOKEN).balanceOf(address(this)) > 0, "Got no more tokens bruh");
        require(rewardBalances[_user] > 0 && rewardBalances[_user] < IERC20(TREASURY_TOKEN).balanceOf(address(this)));
        IERC20(TREASURY_TOKEN).transfer(_user, rewardBalances[_user]);
    }

    function getTotalRewardTokens() view public returns(uint) {
        return IERC20(TREASURY_TOKEN).balanceOf(address(this));
    }

    function getTotalFunds() view public returns(uint) {
        return totalFunds;
    }
}