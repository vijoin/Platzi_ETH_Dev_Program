# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

# Challenge
Create a smart contract that records the amount of visits a contract has, implementing a `visit()` function and an event with visitor address and visit timestamp

bonus point:
frontend to view this data and updates automatically with new visits

include unit tests and deploy scripts