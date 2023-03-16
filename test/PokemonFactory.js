const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Contract Deploy", function () {
  async function deployFixture() {
    const [owner, addr1] = await ethers.getSigners();
    const PokemonFactoryContract = await ethers.getContractFactory(
      "PokemonFactory"
    );
    const pokemonFactory = await PokemonFactoryContract.deploy();
    await pokemonFactory.deployed();

    return { owner, addr1, pokemonFactory };
  }

  it("Deployment should start with Zero pokemons created", async function () {
    const { pokemonFactory } = await loadFixture(deployFixture);

    expect((await pokemonFactory.getAllPokemons()).length).to.equal(0);
  });

  it("Test pokemon is created and added to the list", async function () {
    const { pokemonFactory } = await loadFixture(deployFixture);

    await pokemonFactory.createPokemon(025, "Pikachu");
    expect((await pokemonFactory.getAllPokemons()).length).to.equal(1);
  });

  it("Test that created pokemon has the correct owner", async function () {
    const { pokemonFactory, addr1 } = await loadFixture(deployFixture);

    await pokemonFactory.connect(addr1).createPokemon(025, "Pikachu");
    expect(await pokemonFactory.getOwnerOf(025)).to.equal(addr1.address);
  });

  it("Test amount of pokemons owned by owner", async function () {
    const { pokemonFactory, addr1 } = await loadFixture(deployFixture);

    await pokemonFactory.connect(addr1).createPokemon(176, "Togetic");
    await pokemonFactory.connect(addr1).createPokemon(276, "Taillow");
    expect(await pokemonFactory.getOwnedCounter(addr1.address)).to.equal(2);
  });

  it("Event is emitted on Pokemon creation", async function () {
    const { pokemonFactory, owner } = await loadFixture(deployFixture);

    await expect(await pokemonFactory.createPokemon(518, "Musharna"))
      .to.emit(pokemonFactory, "NewPokemonCreated")
      .withArgs(owner.address, 518, "Musharna");
  });
});
