const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Deploy Token Contract", function () {
  async function deployFixture() {
    const Token = await ethers.getContractFactory("PlatziToken");
    const [owner, addr1] = await ethers.getSigners();

    const platziToken = await Token.deploy(1000, []);

    await platziToken.deployed();

    return { platziToken, owner, addr1 };
  }

  it("Contract is deployed and all minted tokens are assigned to the deployer", async function () {
    const { platziToken, owner } = await loadFixture(deployFixture);

    const ownerBalance = await platziToken.balanceOf(owner.address);
    expect(await platziToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Only owner can mint new tokens", async function () {
    const { platziToken, owner } = await loadFixture(deployFixture);

    await platziToken.mint(owner.address, 500);

    const ownerBalance = await platziToken.balanceOf(owner.address);
    expect(await platziToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Mint reverted if address is not the owner", async function () {
    const { platziToken, addr1 } = await loadFixture(deployFixture);

    await expect(
      platziToken.connect(addr1).mint(addr1.address, 500)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
