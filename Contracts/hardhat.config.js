require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
const ALCHEMY_API_KEY = "lQPWvm74kzjNOKLKF6sIY66VSyrqBw3I";
const GOERLI_PRIVATE_KEY = process.env.PRV_KEY;
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
