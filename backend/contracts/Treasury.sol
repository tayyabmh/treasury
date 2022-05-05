// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Treasury {


    address public TREASURY_TOKEN;
    address public USD_TOKEN;

    struct Proposal {
        uint index;
        string name;
        uint256 voteCount;
    }

    Proposal[] public proposals;

    address public owner;
    uint256 totalFunds;
    uint256 totalUSD;
    mapping (address => uint256) public rewardBalances;
    mapping (uint => uint256) public yesVotes;
    mapping (uint => uint256) public noVotes;
    mapping (uint => mapping(address => bool)) alreadyVoted;

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can access this function");
        _;
    }

    constructor () {
        owner = msg.sender;
        totalFunds = 0;
        // proposals.push(Proposal({
        //     index: 0,
        //     name: "Uniswap Liquidity Proposal"
        // }));
    }

    function voteForProposal(uint _index, bool _vote) public {
        require(IERC20(TREASURY_TOKEN).balanceOf(address(msg.sender)) >0, "Only token holders can vote");
        require(alreadyVoted[_index][msg.sender] == true, "You have already voted for this proposal");
        if(_vote) {
            alreadyVoted[_index][msg.sender] = false;
            yesVotes[_index] += IERC20(TREASURY_TOKEN).balanceOf(address(msg.sender));
        } else if (!_vote) {
            alreadyVoted[_index][msg.sender] = false;
            noVotes[_index] += IERC20(TREASURY_TOKEN).balanceOf(address(msg.sender));
        }
    }

    function getVoteCountsForProposals(uint _index) public returns (uint256, uint256) {
        return (yesVotes[_index], noVotes[_index]);
    }

    function setTreasuryTokenContractAddress(address _tokenContractAddress) public onlyOwner {
        TREASURY_TOKEN = _tokenContractAddress;
    }

    function setUSDTokenContractAddress(address _tokenContractAddress) public onlyOwner {
        USD_TOKEN = _tokenContractAddress;
    }

    function contributeFunds() payable public onlyOwner {
        totalFunds += msg.value;      
    }

    function getUSDBalance() view public returns (uint256) {
        return IERC20(USD_TOKEN).balanceOf(address(this));
    }

    function rewardTokens(address _user, uint256 _amount) public onlyOwner {
        rewardBalances[_user] += _amount;
    }

    function getCirculatingSupply() view public returns (uint256) {
        return (IERC20(TREASURY_TOKEN).totalSupply() - IERC20(TREASURY_TOKEN).balanceOf(address(this)));
    }

    function checkRewards(address _user) view public returns (uint256) {
        return rewardBalances[_user];
    }

    function distributeRewards(address _user) public onlyOwner {
        require(IERC20(TREASURY_TOKEN).balanceOf(address(this)) > 0, "Got no more tokens bruh");
        require(rewardBalances[_user] > 0 && rewardBalances[_user] < IERC20(TREASURY_TOKEN).balanceOf(address(this)));
        uint256 balance = rewardBalances[_user];
        IERC20(TREASURY_TOKEN).transfer(_user, balance);
        rewardBalances[_user] -= balance;
        
    }

    function getAvailableSupply() view public returns(uint256) {
        return IERC20(TREASURY_TOKEN).balanceOf(address(this));
    }

    function getTotalFunds() view public returns(uint) {
        return totalFunds;
    }
}