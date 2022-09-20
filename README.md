# Payment Splitter with NFT integration.

Folders: Web, Contracts

Contracts contains all solidity contracts, and deploy scripts.
Web contains the react frontend to interact with this contract.

To get startet go to the WebApp folder.

## How does the Payment Splitter work?
![Screenshot](SplitterContract.png)
The contract takes in all types of ERC20 and ERC721 Tokens. 
It distributes them according to predefined amount of shares to predefined amount of wallets.

Example:

We have Person 1, Person 2 and Person 3. They made an NFT collection together, and decided to pay themself in ETH and NFTs.

Now they want to split the Team allocation according to their share. This contract allows them to do so, with little effort.

## Usage

![Screenshot](Screenshot.png)

## Security
This project is maintained by [Iris](https://www.iris.to), and developed following our high standards for code quality and security. 
Iris Payment Splitter is meant to provide tested and community-audited code, but please use common sense when doing anything that deals with real money! 
We take no responsibility for your implementation decisions and any security problems you might experience.

The core development principles and strategies that Iris Contracts is based on include: security in depth, simple and modular code, clarity-driven naming conventions, comprehensive unit testing, pre-and-post-condition sanity checks, code consistency, and regular audits.
First audit at 21.10.2022