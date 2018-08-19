# ConsenSys-Academy-Final-Project
Final Project for the ConsenSys 2018 Developer course by Peter Ullrich. 
The project serves as a decentralized register for image ownership. 
Users can upload an image and register their ownership of the image. 
Image ownerships can be checked, transferred, and removed, all from within the contract.

The contract uses Open Zeppelin's [Pausable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol) contract form the EthPM package manager.

## User Story
The Photo Rights contract offers user to register their ownership over certain images. A 
photographer could for example register her ownership over pictures before sending them to 
agencies or online magazines. With the registered ownership, the photographer can always prove 
that she was the first person to register that image. The user can transfer her ownership to 
another user if e.g. she sold the image. Also, the user can remove the ownership registration for
whatever reason there might be. The contract can also be used to check for ownership 
registration of a given image. This could be used by e.g. online magazines to check the 
copyright situation with images they receive or want to publish. 

## Requirements
This project requires you to have installed:
1. [Ganache v6.1.6](https://truffleframework.com/ganache)
1. [Truffle v4.1.13](https://truffleframework.com/)
1. [npm v6.3.0](https://www.npmjs.com/)
1. [Angular CLI v6.0.8](https://cli.angular.io/) 
1. [MetaMask](https://metamask.io/)
1. [Git](https://git-scm.com/)

## Setting up the Project
1. Clone the project with `git clone https://github.com/PJUllrich/ConsenSys-Academy-Final-Project.git`
1. `cd` into the `PhotoRights` folder with `cd ConsenSys-Academy-Final-Project/PhotoRights`
1. Install the Angular dependencies with `npm install`
1. Make sure that Angular is installed with `npm install -g @angular/cli`
1. You're all set!

## Testing the User Interface
1. Start `Ganache` with `ganache-cli -d`
1. From within the `PhotoRights` folder run `ng serve`
1. Open your browser and navigate to `localhost:4200`
1. Watch the following video, which will walk you through the User Interface
![](video.com)

## Testing the Smart Contract
1. Make sure that you have `Ganache` running. If not, start it with `ganache-cli -d`
1. From within the `SmartContracts` folder, run the tests with `truffle test`
1. Check that all tests pass.

The tests were written to test the success scenarios of the main functionality and the checks 
of the modifiers used. The tests cover both the contracts functionality and modifiers as well as
the functionality and modifiers of the [Pausable](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol) contract by Open Zeppelin.
The tests are not 100% exhaustive, but were written to cover all state-changing functionality and all modifiers.

## Rinkeby Testnet
The contract is deployed on the `Rinkeby` testnet with the address: `0xd4e21e63A431a3D1e8c1886c8c355c6dc800e194`
The deployed contract serves the same functionality as the local contract.
The only difference is that the website does not show events for the deployed contract, 
which is an issue of [MetaMask](https://github.com/MetaMask/metamask-extension/issues/2393) that 
currently does not support the websockets necessary to receive the streams from the provider.

You can connect to it through the website like this:
1. Change the network with which `MetaMask` is connected to `Rinkeby testnet`
1. Copy and paste the aforementioned address into the `Contract address` field
1. Click `Connect with Contract`
1. You are now connected to the contract on the Rinkeby testnet!
