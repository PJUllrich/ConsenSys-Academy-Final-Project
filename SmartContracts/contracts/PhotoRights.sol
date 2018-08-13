pragma solidity ^0.4.24;

import "../installed_contracts/zeppelin/contracts/lifecycle/Pausable.sol";

// @title Contract to store, check, transfer, and remove image copyrights.
// @author Peter Ullrich
// @dev Contract extends the Open Zeppelin Pausable contract for its emergency stop implementation.
contract PhotoRights is Pausable {

    // @dev Struct that store all information about a image registration.
    struct Image {

        // @dev Keccak256 hash of image data.
        bytes32 fingerprint;

        // @dev Address owning the image registration.
        address owner;

        // @dev Timestamp of image registration.
        uint timestamp;
    }

    // @dev The main storage array that contains structs that stores
    // all information for the image registrations.
    Image[] public registry;

    // @dev The maximal input length in bytes for image data.
    // Equal to the length of a Sha256 hash, which has 256 bit = 64 bytes.
    uint private maxInputLength = 64;

    // @dev Registration event is emitted whenever a new image is registered.
    event Registration(address adder, uint index, bytes32 hash);

    // @dev Removal event is emitted whenever a image registration is removed.
    event Removal(address remover, uint index);

    // @dev Transfer event is emitted whenever a image registration is transferred
    // to a new owner address.
    event Transfer(address oldOwner, address newOwner, uint newIndex);

    // @dev Conditional Modifier that verifies the validity of an index input
    // and checks that a image registration exists at the given index.
    modifier exists(uint index) {
        require(index >= 0);
        require(index < registry.length);
        require(registry[index].fingerprint != 0);
        _;
    }

    // @dev Access Modifier that restricts certain image registration functionality
    // to the registration's owner address.
    modifier isOwner(address owner, uint index) {
        require(registry[index].owner == owner);
        _;
    }

    // @dev Conditional Modifier that verifies that the image data input is not empty.
    // Could be extended to cover more edge cases.
    modifier dataAllowed(string imageData) {
        require(bytes(imageData).length <= maxInputLength);
        require(bytes(imageData).length > 0);
        _;
    }

    // @dev An external method that allows the user to create a new image registration
    // from a string containing the image data. The string is typically a Sha3 hex hash of the
    // actual image, but can be any information really. Will generate a Registration event upon
    // completion. Method only available if contract is not paused.
    // @param imageData The data of the image. Typically a hex hash of the actual image.
    function register(
        string imageData
    )
        external
        dataAllowed(imageData)
        whenNotPaused
    {
        bytes32 fingerprint = digest(imageData);

        (bool registered,) = isRegistered(fingerprint);
        require(!registered);

        registry.push(Image(fingerprint, msg.sender, now));

        emit Registration(msg.sender, registry.length - 1, fingerprint);
    }

    // @dev An external view method that checks whether a image registration for
    // given image data exists. Returns true and the index of the registration if a
    // image registration exists, otherwise returns false and null. The method is
    // available even if the contract is paused, since no state changes are created.
    // @param imageData The data of the image. Typically a hex hash of the actual image.
    function checkRegistration(
        string imageData
    )
        external
        view
        dataAllowed(imageData)
        returns (bool, uint)
    {
        return isRegistered(digest(imageData));
    }

    // @dev An external method with which a image registration can be removed. Only the owner of
    // the registration can remove the registration. Will generate a Removal event upon completion.
    // The method is not available when the contract is paused since it changes the state.
    // @param index The index of the image registration to be removed.
    function remove(
        uint index
    )
        external
        exists(index)
        isOwner(msg.sender, index)
        whenNotPaused
    {
        delete registry[index];

        emit Removal(msg.sender, index);
    }

    // @dev An external method that transfers the ownership over a image registration to a new
    // owner address. Checks that the new owner address is not the null address to prevent
    // an image registration from becoming unavailable. The method is not available when the
    // contract is paused since it changes the state. Generates a Transfer event upon completion.
    // @param index The index of the image registration to be transferred in the registry array.
    // @param newOwner The address to which the registration ownership shall be transferred.
    function transfer(
        uint index,
        address newOwner
    )
        external
        exists(index)
        isOwner(msg.sender, index)
        whenNotPaused
    {
        require(newOwner != address(0));

        registry[index].owner = newOwner;

        emit Transfer(msg.sender, newOwner, index);
    }

    // @dev An external view method that simply returns the length of the registry array. This
    // function is necessary for the UI to iterate through every registration in the registry array.
    function getRegistrationCount()
        external
        view
        returns (uint)
    {
        return registry.length;
    }

    // @dev An internal view method that checks whether a registration for a given keccak256 hash exists.
    // Returns true and the index of the registration in the registry array if a image registration
    // exists. Otherwise returns false and null. The method iterates through the whole registry
    // array and checks whether any registration contains the given keccak256 hash.
    // @param fingerprint A keccak256 hash, whose existence of registration is to be checked.
    function isRegistered(
        bytes32 fingerprint
    )
        internal
        view
        returns (bool, uint)
    {
        for (uint idx = 0; idx < registry.length; idx++) {
            if (registry[idx].fingerprint == fingerprint) {
                return (true, idx);
            }
        }

        return (false, 0);
    }

    // @dev A pure internal method that converts a given string input to bytes and creates the
    // keccak256 hash of those bytes. The method returns the computed keccak256 hash of the bytes.
    function digest(
        string input
    )
        internal
        pure
        returns (bytes32)
    {
        return keccak256(bytes(input));
    }
}