// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract PlatziToken is ERC777 {
    constructor(
        uint256 _initialSupply,
        address[] memory _defaultOperators
    ) ERC777("PlatziToken", "PLT", _defaultOperators) {
        _mint(msg.sender, _initialSupply, "", "");
    }
}
