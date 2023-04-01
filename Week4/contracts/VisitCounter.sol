// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract VisitCounter {
    uint256 count;

    event NewVisitor(address indexed visitor, uint256 timestamp);

    function visit() public {
        count += 1;
        emit NewVisitor(msg.sender, block.timestamp);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
