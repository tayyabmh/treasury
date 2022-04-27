// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KToken is ERC20 {
    constructor(address _treasuryAddress, uint256 _initialSupply) public ERC20("Treasury Token", "TREASURE") {
        _mint(_treasuryAddress, _initialSupply * (10 **18));
    }
}