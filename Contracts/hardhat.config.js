require("@nomicfoundation/hardhat-toolbox");
const ALCHEMY_API_KEY = "lQPWvm74kzjNOKLKF6sIY66VSyrqBw3I";
const GOERLI_PRIVATE_KEY = "0055b8a9aa0efd74fbc2761460f2e84b64c999ec465944065a88ebd5e75d9d8e";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }
};
