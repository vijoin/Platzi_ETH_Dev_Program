const {
  loadFixture,
  time,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("VisitCounter", function () {
  async function deploymentFixture() {
    [deployer, visitor1, visitor2] = await ethers.getSigners();
    VisitCounter = await ethers.getContractFactory("VisitCounter");
    visitCounter = await VisitCounter.deploy();
    await visitCounter.deployed();

    return { visitCounter, visitor1, visitor2 };
  }

  describe("Deployment", function () {
    it("Contract is deployed with count at Zero", async function () {
      const { visitCounter } = await loadFixture(deploymentFixture);
      expect(await visitCounter.getCount()).to.equal(0);
    });
  });

  describe("Visits", function () {
    describe("Record visits", function () {
      it("Single user records visit and counter increases", async function () {
        const { visitCounter, visitor1 } = await loadFixture(deploymentFixture);

        await visitCounter.connect(visitor1).visit();

        expect(await visitCounter.getCount()).to.deep.equal(
          ethers.BigNumber.from("1")
        );
      });

      it("Multiple users record multiple visits and counter increases", async function () {
        const { visitCounter, visitor1 } = await loadFixture(deploymentFixture);

        for (i = 0; i < 5; i++) {
          await visitCounter.connect(visitor1).visit();
          await visitCounter.connect(visitor2).visit();
        }

        expect(await visitCounter.getCount()).to.deep.equal(
          ethers.BigNumber.from("10")
        );
      });
    });

    describe("Events", function () {
      it("User's visit emits an event", async function () {
        const { visitCounter, visitor1 } = await loadFixture(deploymentFixture);

        timeOffset = 1;
        await expect(visitCounter.connect(visitor1).visit())
          .to.emit(visitCounter, "NewVisitor")
          .withArgs(visitor1.address, (await time.latest()) + timeOffset);
      });
    });
  });
});
