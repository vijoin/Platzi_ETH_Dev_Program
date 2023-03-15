const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Contract Deploy", function () {
  async function deployFixture() {
    const [owner] = await ethers.getSigners();
    const PokemonFactoryContract = await ethers.getContractFactory(
      "PokemonFactory"
    );
    const pokemonFactory = await PokemonFactoryContract.deploy();
    await pokemonFactory.deployed();

    return { owner, pokemonFactory };
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
});
