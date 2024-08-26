const { version } = require("chai");

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.BASESEPOLIO_RPC;
const PRIVATE_KEY = process.env.BASESEPOLIO_PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      chainId: 84532,
    },
  },
  // solidity: "0.8.24",
  solidity: {
    compilers: [
      { version: "0.8.8" },
      { version: "0.6.6" },
      { version: "0.8.24" },
    ],
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  sourcify: {
    enabled: true,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: 111,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
