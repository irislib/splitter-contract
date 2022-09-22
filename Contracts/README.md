# Splitter Hardhat Project

This projects contains the Hardhat Project for the NFT Splitter.
The contracts folder contains the NFTSplitter.sol and PaymentSplitterV2 contract.

## Get Started
Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

### NFTSplitter
The NFTSplitter contract allows you to distribute a NFTs according to the defined amount of shares to payees.
Note: 
All ETH and ERC20 token send to this contract can't be recovered.
Always send ERC721 token via Safetransfer or SafeMint function to this contract, otherwise they will be lost and can't be recovered.

### PaymentSplitterV2
The PaymentSplitterV2 contract is based on the PaymentSplitter contract by OpenZeppelin. It allows you to distribute a ERC20,ETH and ERC721 according to the defined amount of shares to payees.

Note:
Always send ERC721 token via Safetransfer or SafeMint function to this contract, otherwise you have to use the contracts safetransfer function to transfer the ERC721 token correctly

Functions:
```
constructor(payees, shares)
totalShares()
totalReleased()
totalReleasedERC721()
shares(account)
released(account)
releasedERC721(account)
payee(index)
release(account)
releaseERC721()
safeTransferERC721()
```
Events:
```
PayeeAdded(account, shares)
PaymentReleased(to, amount)
PaymentReceived(from, amount)
```
```
constructor([.var-type]#address[# payees, uint256[] shares)]

Creates an instance of PaymentSplitter where each account in payees is assigned the number of shares at the matching position in the shares array.
All addresses in payees must be non-zero. Both arrays must have the same non-zero length, and there must be no duplicates in payees.
```

## Security
This project is maintained by [Iris](https://www.iris.to), and developed following our high standards for code quality and security. 
Iris Payment Splitter is meant to provide tested and community-audited code, but please use common sense when doing anything that deals with real money! 
We take no responsibility for your implementation decisions and any security problems you might experience.

The core development principles and strategies that Iris Contracts is based on include: security in depth, simple and modular code, clarity-driven naming conventions, comprehensive unit testing, pre-and-post-condition sanity checks, code consistency, and regular audits.
First audit at 21.10.2022