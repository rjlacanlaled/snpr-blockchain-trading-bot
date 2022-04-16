// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    uint256 public funds;
    uint256 public duration;
    address payable public depositor;
    address payable public recipient;

    event FundsAdded(uint256 amount, uint256 totalFunds);
    event FundsWithdrawn(uint256 totalFunds, address to);

    modifier onlyDepositor() {
        require(msg.sender == depositor, "Not the depositor");
        _;
    }

    modifier onlyRecipient() {
        require(msg.sender == recipient, "Not the recipient");
        _;
    }

    modifier onlyAfter(uint256 time) {
        require(block.timestamp > time, "Too early");
        _;
    }

    modifier onlyBefore(uint256 time) {
        require(block.timestamp < time, "Too late");
        _;
    }

    constructor(address _recipient, uint256 _duration) {
        recipient = payable(_recipient);
        depositor = payable(msg.sender);
        duration = block.timestamp + _duration;
    }

    function deposit()
        external
        payable
        onlyDepositor
        onlyBefore(duration)
        returns (bool success)
    {
        require(msg.value > 0, "Value must be greater than zero");
        funds += msg.value;
        emit FundsAdded(msg.value, funds);
        return true;
    }

    function withdraw()
        external
        onlyRecipient
        onlyAfter(duration)
        returns (bool success)
    {
        require(funds > 0, "No funds to withdraw");
        recipient.transfer(funds);
        emit FundsWithdrawn(funds, recipient);
        funds = 0;
        return true;
    }
}
