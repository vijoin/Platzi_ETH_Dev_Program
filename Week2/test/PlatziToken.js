const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Deploy Token Contract", function () {
    async function deployFixture() {
        const Token = await ethers.getContractFactory("PlatziToken");
        const [ owner ] = await ethers.getSigners();

        const platziToken = await Token.deploy(1000, []);

        await platziToken.deployed();

        return { platziToken, owner };
    }

    it("Contract is deployed and all minted tokens are assigned to the deployer", async function () {
       const { platziToken, owner } = await loadFixture(deployFixture);
        
       const ownerBalance = await platziToken.balanceOf(owner.address);
       expect(await platziToken.totalSupply()).to.equal(ownerBalance);
    });
})