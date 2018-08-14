var Migrations = artifacts.require("./PhotoRights.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
