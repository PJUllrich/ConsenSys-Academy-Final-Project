pragma solidity ^0.4.24;

contract PhotoRights {

    struct Hash {
        bytes32 fingerprint;
        address owner;
        uint timestamp;
    }

    Hash[] public registry;

    event Registration(address adder, uint index, bytes32 hash);
    event Removal(address remover, uint index);
    event Transfer(address oldOwner, address newOwner, uint newIndex);

    modifier exists(uint index) {
        require(0 <= index);
        require(index < registry.length);
        require(registry[index].fingerprint != 0);
        _;
    }

    modifier isOwner(address owner, uint index) {
        require(registry[index].owner == owner);
        _;
    }

    function isRegistered(bytes32 fingerprint) public view returns (bool, uint) {
        for (uint idx = 0; idx < registry.length; idx++) {
            if (registry[idx].fingerprint == fingerprint) {
                return (true, idx);
            }
        }

        return (false, 0);
    }

    function register(bytes image) public {
        bytes32 fingerprint = keccak256(image);

        (bool registered, ) = isRegistered(fingerprint);
        require(!registered);

        registry.push(Hash(fingerprint, msg.sender, now));

        emit Registration(msg.sender, registry.length, fingerprint);
    }

    function getHash(uint index) public view exists(index) returns (bytes32, address, uint) {
        return (registry[index].fingerprint, registry[index].owner, registry[index].timestamp);
    }

    function remove(uint index) public exists(index) isOwner(msg.sender, index) {
        delete registry[index];

        emit Removal(msg.sender, index);
    }

    function transfer(address newOwner, uint index) public exists(index) isOwner(msg.sender, index) {
        registry[index].owner = newOwner;

        emit Transfer(msg.sender, newOwner, index);
    }
}