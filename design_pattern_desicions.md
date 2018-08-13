# Design Pattern Decisions
## System Design Considerations
The main requirement of the smart contract to fulfill was to keep track of who owns the ownership
to what image. I decided on fulfilling this requirement by creating a relatively simple storage
contract that stores the ownerships of images. I decided on creating the standard CRUD 
(Create, Retrieve, Update, Delete) functionality and use Ethereum's unique properties for 
restricting access to some of this functionality to the owner only. In the following, I will
explain how I restricted the access.

## Restricting Access
I used the `isOwner` modifier to restrict the access and control over a image registration to 
the address of its owner. This is meant to prevent anybody but the owner to remove the image 
registration or transfer the image ownership to another address.

I used the `Pausable` contract by [Open Zeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol)
to restrict access to any state-changing methods whenever there is the need to stop the contract.
The `Pausable` contract implements `pause()` and `unpause()` functions with which the contract
can be stopped. The contract can only be paused or unpaused by the owner of the contract, which
is the address that deployed the contract unless the ownership was transferred to another address.
The pausing functionality of the `Pausable` contract functions as emergency stop/circuit breaker. 
I chose not to restrict access to non-state-changing functions even when the contract is stopped
since access to the contract storage cannot be prevented anyway.

### Contract Security
I followed the Checks-Effects-Interactions coding pattern in my code to prevent reentry and other possible attacks.  