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
        uint[] skills;
    }

    struct Skill {
        string name;
        string description;
    }

    Pokemon[] pokemons;

    mapping(uint => Skill) public skillList;

    mapping(uint => address) pokemonOwners;

    mapping(address => uint) ownerCounter;

    event NewPokemonCreated(address owner, uint id, string name);

    function createPokemon(
        uint _id,
        string memory _name,
        PokeType[] memory _types,
        PokeType[] memory _weaknesses,
        uint[] memory _skills
    ) public {
        require(_id > 0, "ID must be greater than Zero");
        require(
            bytes(_name).length >= 2,
            "Name must have at least two characters"
        );
        pokemons.push(Pokemon(_id, _name, _types, _weaknesses, _skills));
        pokemonOwners[_id] = msg.sender;
        ownerCounter[msg.sender]++;

        emit NewPokemonCreated(msg.sender, _id, _name);
    }

    function createSkill(
        uint _id,
        string memory _name,
        string memory _description
    ) public {
        skillList[_id] = Skill(_name, _description);
    }

    function addSkillToPokemon(uint _skillId, uint _pokemonId) public {
        pokemons[_pokemonId].skills.push(_skillId);
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
