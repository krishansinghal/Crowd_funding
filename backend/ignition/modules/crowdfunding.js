// Import the 'buildModule' function from the '@nomicfoundation/hardhat-ignition/modules' package
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// Define a constant representing January 1st, 2030, in Unix timestamp
const JAN_1ST_2030 = 1893456000;

// Define a constant representing one Gwei (1,000,000,000 wei)
const ONE_GWEI = 1_000_000_000n;

// Export 'CrowdFundingModule' using the 'buildModule' function
module.exports = buildModule("CrowdFundingModule", (m) => {
  
  // Define a contract 'CrowdFunding' within the module
  const contract = m.contract("CrowdFunding");

  return { contract };
});
