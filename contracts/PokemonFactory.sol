// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract PokemonFactory {
    enum PokeType {
        Grass,
        Poison,
        Fire,
        Flying,
        Ice,
        Psychic
    }

    struct Pokemon {
        uint id;
        string name;
        PokeType[] types;
        PokeType[] weaknesses;
    }

    Pokemon[] pokemons;

    mapping(uint => address) pokemonOwners;

    mapping(address => uint) ownerCounter;

    event NewPokemonCreated(address owner, uint id, string name);

    function createPokemon(uint _id, string memory _name, PokeType[] memory _types, PokeType[] memory _weaknesses) public {
        require(_id > 0, "ID must be greater than Zero");
        require(
            bytes(_name).length >= 2,
            "Name must have at least two characters"
        );
        pokemons.push(Pokemon(_id, _name, _types, _weaknesses));
        pokemonOwners[_id] = msg.sender;
        ownerCounter[msg.sender]++;

        emit NewPokemonCreated(msg.sender, _id, _name);
    }

    function getAllPokemons() public view returns (Pokemon[] memory) {
        return pokemons;
    }

    function getOwnerOf(uint _id) public view returns (address) {
        return pokemonOwners[_id];
    }

    function getOwnedCounter(address _owner) public view returns (uint) {
        return ownerCounter[_owner];
    }
}
