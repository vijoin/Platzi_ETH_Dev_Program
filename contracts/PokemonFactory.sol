// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract PokemonFactory {
    struct Pokemon {
        uint id;
        string name;
    }

    Pokemon[] pokemons;

    mapping(uint => address) pokemonOwners;

    function createPokemon(uint _id, string memory _name) public {
        pokemons.push(Pokemon(_id, _name));
        pokemonOwners[_id] = msg.sender;
        // TODO increase owner counter
    }

    function getAllPokemons() public view returns (Pokemon[] memory) {
        return pokemons;
    }

    function getOwnerOf(uint _id) public view returns (address) {
        return pokemonOwners[_id];
    }
}
