require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
const { chainConfig } = require("./chains.ts");
const KEYS = require("./private.json");

// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const TESTNET_PRIVATE_KEY = KEYS.privateKey;
const MAINNET_PRIVATE_KEY = KEYS.privateKey;
const selectedNetwork = "one";
const INFURA_API_KEY = "";

module.exports = {
  solidity: {
    version: "0.8.4",
    optimizer: {
      enabled: true,
      runs: 200,
      details: {
        yul: false,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: "http://localhost:8545",
      allowUnlimitedContractSize: true,
    },
    testnet: {
      url: chainConfig[selectedNetwork].testnet.rpc[0],
      accounts: [`0x${TESTNET_PRIVATE_KEY}`],
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      url: chainConfig[selectedNetwork].mainnet.rpc[0],
      accounts: [`0x${MAINNET_PRIVATE_KEY}`],
      allowUnlimitedContractSize: true,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    deploy: "deploy",
    deployments: "deployments",
  },
};
