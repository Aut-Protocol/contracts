// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const autIDAddr = "0x00fbB8e663614f16e85df9634fd116aecF4872F9";
  const daoTypesAddr = "0x2a7A1f0Da4FA3FFd93dE76e131bfB07Cf9a9Ec81";
  const daoExpanderFactoryAddr = "0x75878b9701308470296cD69b734fa8b2f4303f5e";

  const DAOExpanderRegistry = await hre.ethers.getContractFactory(
    "DAOExpanderRegistry"
  );
  const daoExpanderRegistry = await DAOExpanderRegistry.deploy(
    autIDAddr,
    daoTypesAddr,
    daoExpanderFactoryAddr
  );
  await daoExpanderRegistry.deployed();

  console.log('DAOExpanderRegistry', daoExpanderRegistry.address);
  
  const a = await daoExpanderRegistry.getDAOExpanders();
  console.log('daoExpanders', a);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
