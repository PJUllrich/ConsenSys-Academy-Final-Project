# ConsenSys-Academy-Final-Project
Final Project for the ConsenSys 2018 Developer course

## Requirements
This project requires you to have installed:
1. [Ganache v6.1.6](https://truffleframework.com/ganache)
1. [Truffle v4.1.13](https://truffleframework.com/)
1. [npm v6.3.0](https://www.npmjs.com/)
1. [MetaMask](https://metamask.io/)
1. [Git](https://git-scm.com/)

## Setting up the Project
1. Clone the project with `git clone https://github.com/PJUllrich/ConsenSys-Academy-Final-Project.git`
1. `cd` into the `PhotoRights` folder with `cd PhotoRights`
1. Install the Angular dependencies with `npm install`
1. You're all set!

## Testing the User Interface
1. Start `Ganache` with `ganache-cli -d`
1. From within the `PhotoRights` folder run `ng serve`
1. Open your browser and navigate to `localhost:4200`
1. Watch the following video, which will walk you through the User Interface
![](video.com)

## Testing the Smart Contract
1. `cd` into the Truffle project with `cd SmartContracts`
1. Make sure that you have `Ganache` running. If not, start it with `ganache-cli -d`
1. Run the tests with `truffle test`
1. Check that all tests pass.

## Improvement Possibilities
- Use IpcProvider instead of HTTPProvider (not supported by Ganache-Cli yet(https://github.com/trufflesuite/ganache-cli/issues/180))
- Support Photo Rights before  registration in smart contract

## Deployed on Rinkeby Testnet
`0xd4e21e63A431a3D1e8c1886c8c355c6dc800e194`