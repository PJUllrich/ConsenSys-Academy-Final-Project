pragma solidity ^0.4.24;

import "../installed_contracts/zeppelin/contracts/lifecycle/Pausable.sol";

contract PhotoRights is Pausable {

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
        require(index >= 0);
        require(index < registry.length);
        require(registry[index].fingerprint != 0);
        _;
    }

    modifier isOwner(address owner, uint index) {
        require(registry[index].owner == owner);
        _;
    }

    modifier hashAllowed(string imageHash) {
        require(digest(imageHash) != digest(''));
        _;
    }

    function register(string imageHash) external hashAllowed(imageHash) whenNotPaused {
        bytes32 fingerprint = digest(imageHash);

        (bool registered, ) = isRegistered(fingerprint);
        require(!registered);

        registry.push(Hash(fingerprint, msg.sender, now));

        emit Registration(msg.sender, registry.length - 1, fingerprint);
    }

    function checkRegistration(string imageHash) external view hashAllowed(imageHash) returns (bool, uint) {
        bytes32 fingerprint = digest(imageHash);
        return isRegistered(fingerprint);
    }

    function remove(uint index) external exists(index) isOwner(msg.sender, index) whenNotPaused {
        delete registry[index];

        emit Removal(msg.sender, index);
    }

    function transfer(uint index, address newOwner) external exists(index) isOwner(msg.sender, index) whenNotPaused {
        require(newOwner != address(0));

        registry[index].owner = newOwner;

        emit Transfer(msg.sender, newOwner, index);
    }

    function getRegistrationCount() external view returns (uint) {
        return registry.length;
    }

    function isRegistered(bytes32 fingerprint) internal view returns (bool, uint) {
        for (uint idx = 0; idx < registry.length; idx++) {
            if (registry[idx].fingerprint == fingerprint) {
                return (true, idx);
            }
        }

        return (false, 0);
    }

    function digest(string input) internal pure returns (bytes32) {
        return keccak256(bytes(input));
    }
}