// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const payees = ["0xc8eBbD99Ad8b41E6F8d04dceD4D807bB2B08794B","0x29cE882C55a795977B1570Fb1E9Ab88ce21da0cc","0x90cb4b5Ac3596bE86126389Fc47BD82dfd6C35a4"];
  const shares = [4,3,3];

  const NFTSplitter = await hre.ethers.getContractFactory("NFTSplitter");
  const nFTSplitter = await NFTSplitter.deploy(payees, shares);

  await nFTSplitter.deployed();

  console.log(
    `NFT splitter deployed to ${nFTSplitter.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//Last deploy:0x258eE9CAb039295B155Bd3487Df04542975918F3