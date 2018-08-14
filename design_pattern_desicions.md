# Design Pattern Decisions
## System Design Considerations
The main requirement of the smart contract to fulfill was to keep track of who owns the ownership
to what image. I decided on fulfilling this requirement by creating a relatively simple storage
contract that stores the ownerships of images. I decided on creating the standard CRUD 
(Create, Retrieve, Update, Delete) functionality and use Ethereum's unique properties for 
restricting access to some of this functionality to the owner only. In the following, I will explain 
which design patterns I implemented and which I didn't and why. I used the provided overview of 
[Design Patterns](https://github.com/cjgdev/smart-contract-patterns) for my implementation and  
following analysis. 

### Auto Depreciation
Since the contract serves as a storage for image ownership, its data rather than its 
functionality is of utmost importance. Therefore, the contract cannot be replaced or depreciated 
since otherwise the storage would be lost. This is why I haven't implemented an Auto Depreciation
design pattern.
 
 ### Mortal
I haven't implemented the `mortal` design pattern since I do not want to give the creator of the
contract ultimate power over the contract and its stored image ownerships. The contract can be 
paused if an emergency arises, but no one should be able to fully delete or destruct it. 
  
### Relay
Just as `Auto Depreciation`, the contract cannot be replaced without loosing its meaningfulness. 
Therefore, the `relay` pattern would not make sense in the given context and was not implemented.

### Data Segregation
This design pattern would suit the project context well, but I decided that it introduces too 
much complexity for such a relatively simple storage contract. Therefore, it was not implemented 
during the final project. For a production ready project, I would implement this, but also would 
let it be properly audited.

### Ownership
This design pattern was implemented by using the `Pausable` contract of Open Zeppelin. There are 
two levels of ownership checks. The higher one is for the whole contract, which is owned by the 
deploying address. The contract owner can pause and unpause the contract. The second level is for
 the image registrations, which can only be transferred or removed by the image owners. This 
 design pattern was implemented by myself.
 
 ### Circuit Breaker
 This design pattern was implemented by using the `Pausable` contract of Open Zeppelin. The 
 contract owner can pause and unpause the contract, but not destroy it, which was meant to limit 
 the superpowers of the contract owner. 
 
 ### Rejector
 This pattern was implemented to reject any ether send accidentally or not to the contract.
 
 ### Speed Bump
 This pattern was not implemented since I did not want to restrict the speed with which the 
 contract can be used. If a user wants to register her existing image portfolio and call the 
 contract 1000 times or more, then so be it. If the user is willing to spend the Ether necessary 
 to make that many calls, then so be it.  

### Restricting Access
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

### General Contract Security
I followed the Checks-Effects-Interactions coding pattern in my code to prevent reentry and other possible attacks.  