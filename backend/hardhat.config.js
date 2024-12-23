// Importing necessary modules
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config(); // Loading environment variables from .env file

/** 
 * Hardhat configuration object.
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "ganache", // Default network for running tasks

  networks: {
    hardhat: {}, // Hardhat built-in network configuration

      //config of Ganache local blockchain
    ganache: {
      url: 'http://127.0.0.1:7545', 
      chainId: 1337, 
      from: `${process.env.WALLET_ADDRESS}`, // Sender address for transactions
      gas: 3000000 
    },

    //configuration for a custom network (Sepolia)
    // Uncomment and configure according to your setup if needed
    // sepolia: {
    //   url: `${process.env.SEPOLIA_URL}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`] 
    // }
  },
};
