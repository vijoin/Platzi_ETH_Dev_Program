// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract PokemonFactory {
    struct Pokemon {
        uint id;
        string name;
    }

    Pokemon[] pokemons;

    mapping(uint => address) pokemonOwners;

    mapping(address => uint) ownerCounter;

    event NewPokemonCreated(address owner, uint id, string name);

    function createPokemon(uint _id, string memory _name) public {
        pokemons.push(Pokemon(_id, _name));
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
