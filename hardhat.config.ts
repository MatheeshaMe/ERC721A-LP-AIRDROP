//Tools
import "@atixlabs/hardhat-time-n-mine";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
// import RunnerRegistryDeployment from './deploymentsdeployments/ropsten/RunnerRegistry.json';
// Contract Verification
// import "@nomiclabs/hardhat-etherscan"; // Uncomment/comment to enable/disable Etherscan verification (should be used with --network=mainnet only!!)
import "@tenderly/hardhat-tenderly";
import "@typechain/hardhat";
import "dotenv/config";
// Hardhat deploy
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";
import "solidity-coverage";
import { RandomToken } from "./types";
import { accounts, node_url } from "./utils/configs";
import "@nomiclabs/hardhat-etherscan";


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const account = [process.env.GOERLI_SECRET!]

const config: HardhatUserConfig = {
  networks: {
    goerli: {
      url:process.env.GOERLI_URL!,
      accounts: account
    },
    ropsten: {
      url: node_url("ropsten"),
      accounts: accounts("ropsten"),
      gasMultiplier: 1.2,
    },
    hardhat: {
      gasPrice: process.env.NODE_ENV === "test" ? 21 : "auto",
      tags: ["Core", "Test"],
      loggingEnabled: process.env.EXTENDED_LOGS === "true" ? true : false,
    },
  },
  tenderly: {
    project: "project",
    username: 'Randomfinance'
  },
  namedAccounts: {
    deployer: 4,
    user: 1,
    keeper_node: 2,
    operator_node: 3,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY! || "",
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // metadata: {
      //   // do not include the metadata hash, since this is machine dependent
      //   // and we want all generated code to be deterministic
      //   // https://docs.soliditylang.org/en/v0.7.6/metadata.html
      //   bytecodeHash: "none",
      // },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS == "true" ? true : false,
    currency: "USD",
  },
  typechain: {
    outDir: "./types",
    target: "ethers-v5",
  },
};

export default config;
