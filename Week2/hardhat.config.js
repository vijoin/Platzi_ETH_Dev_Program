require("@nomicfoundation/hardhat-toolbox");

// Need to deploy ERC777 contracts
// https://forum.openzeppelin.com/t/error-on-deploy-of-erc777-on-hardhat/5669/2
require("hardhat-erc1820");

module.exports = {
  solidity: "0.8.18",
};
