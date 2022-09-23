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
```
receive()

The Ether received will be logged with PaymentReceived events. Note that these events are not fully reliable: it’s possible for a contract to receive Ether without triggering this function. This only affects the reliability of the events, and not the actual splitting of Ether.
To learn more about this see the Solidity documentation for fallback functions.
```
```
totalShares() → uint256
Getter for the total shares held by payees.
```
```
totalReleased() → uint256
Getter for the total amount of Ether already released.
```
```
totalReleased(contract IERC20 token) → uint256
Getter for the total amount of token already released. token should be the address of an IERC20 contract.
```
```
totalReleasedERC721(contract IERC721 token) → uint256
Getter for the total amount of ERC721 of type token already released.
```
```
shares(address account) → uint256
Getter for the amount of shares held by an account.
```
```
released(address account) → uint256
Getter for the amount of Ether already released to a payee.
```
```
released(contract IERC20 token, address account) → uint256
Getter for the amount of token tokens already released to a payee. token should be the address of an IERC20 contract.
```
```
releasedERC721(contract IERC721 token, address account) → uint256
Getter for the amount of token tokens already released to a payee. token should be the address of an IERC721 contract.
```
```
payee(uint256 index) → address
Getter for the address of the payee number index.
```
```
releasable(address account) → uint256
Getter for the amount of payee’s releasable Ether.
```

```
releasable(contract IERC20 token, address account) → uint256
Getter for the amount of payee’s releasable token tokens. token should be the address of an IERC20 contract.
```

```
releasableERC721(contract IERC721 token, address account) → uint256
Getter for the amount of payee’s releasable token tokens. token should be the address of an IERC721 contract.
```
```
release(address payable account)
Triggers a transfer to account of the amount of Ether they are owed, according to their percentage of the total shares and their previous withdrawals.
```
```
release(contract IERC20 token, address account)
Triggers a transfer to account of the amount of token tokens they are owed, according to their percentage of the total shares and their previous withdrawals. token must be the address of an IERC20 contract.
```
```
releaseERC721(contract IERC721 token, address account)
Triggers a transfer to account of the amount of token tokens they are owed, according to their percentage of the total shares and their previous withdrawals. token must be the address of an IERC721 contract.
```
```
safeTransferERC721(contract IERC721 token,uint 256 tokenid)
Calles the Safetransfer function of token IERC721 with tokenid.
```

## Security
This project is maintained by [Iris](https://www.iris.to), and developed following our high standards for code quality and security. 
Iris Payment Splitter is meant to provide tested and community-audited code, but please use common sense when doing anything that deals with real money! 
We take no responsibility for your implementation decisions and any security problems you might experience.

The core development principles and strategies that Iris Contracts is based on include: security in depth, simple and modular code, clarity-driven naming conventions, comprehensive unit testing, pre-and-post-condition sanity checks, code consistency, and regular audits.
First audit at 21.10.2022