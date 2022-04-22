// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Treasury {

    address public owner;
    uint totalFunds;

    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can access this function");
        _;
    }

    constructor () {
        owner = msg.sender;
        totalFunds = 0;
    }

    function contributeFunds() payable public onlyOwner {
        totalFunds += msg.value;      
    }

    function getTotalFunds() view public returns(uint) {
        return totalFunds;
    }
}