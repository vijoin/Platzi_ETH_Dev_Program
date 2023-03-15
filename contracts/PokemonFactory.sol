// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract PokemonFactory {
    struct Pokemon {
        uint id;
        string name;
    }

    Pokemon[] pokemons;

    function createPokemon(uint _id, string memory _name) public {
        pokemons.push(Pokemon(_id, _name));
        // push a new pokemon to pokemons
        // store owner
        // increase owner counter
    }

    function getAllPokemons() public view returns (Pokemon[] memory) {
        return pokemons;
    }
}