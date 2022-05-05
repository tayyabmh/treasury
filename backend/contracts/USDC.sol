// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20 {
    constructor(address _companyAddress, uint256 _initialSupply) public ERC20("US Dollars", "USD") {
        _mint(_companyAddress, _initialSupply* (10 ** 18));
    }
}