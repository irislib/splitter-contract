# Payment Splitter with NFT(ERC721) integration.

## Important!!!
This smart contract system is outdated. Please message me before integration!  

Folders: Web, Contracts

Contracts contains all solidity contracts, and deploy scripts.
Web contains the react frontend to interact with this contract.

To get startet go to the WebApp folder.

## How does the Payment Splitter work?
![Screenshot](SplitterContract.png)
The contract takes in all types of ERC20 and ERC721 Tokens. 
It distributes them according to predefined amount of shares to predefined amount of wallets.

Example:
In this example NFT/NFTs refers to an ERC721 token.

Let's imagine we have Person 1, Person 2 and Person 3. They made an NFT collection together, and decided to pay themself in ETH and NFTs.
Now they want to split the team allocation according to their shares. Person 1 has 50 shares Person 2 and 3 have both 25 shares.
They set up a payment splitter contract with these shares. Now every time an NFT is sent to the contract via SafeTransfer
The contract tracks the NFT.
In our example the contract received 20 NFTs and 1 ETH. Now Person 1 can call the "withdrawal" function on the frontend,
or call the "releaseERC721" to received 10 NFTs. He can also call the "release" function, so he can claim 0.5 ETH from the contract.
Person 2 and 3 can both withdrawal 5 NFTs and 0.25 ETH.

## Usage

![Screenshot](Screenshot.png)

## Security
This project is maintained by [Iris](https://www.iris.to), and developed following our high standards for code quality and security. 
Iris Payment Splitter is meant to provide tested and community-audited code, but please use common sense when doing anything that deals with real money! 
We take no responsibility for your implementation decisions and any security problems you might experience.

The core development principles and strategies that Iris Contracts is based on include: security in depth, simple and modular code, clarity-driven naming conventions, comprehensive unit testing, pre-and-post-condition sanity checks, code consistency, and regular audits.
First audit at 21.10.2022

## Contact
Join our [Discord](https://discord.gg/4CJc74JEUY) (will be moved onto Iris when group chat is ready) or send me a message on [Iris](https://iris.to/?chatWith=ukcw5nlKQTJ-eUaBld6OSKK1g2hWGMMCBSAdtNhxq2E.uj5ExCuzUuQ48k6Io72wAcMVSXDBvTwGZOX7sSy-dEo&s=n4HGTkFoXW9YViI6IqtRkcznsj5werPAPApXiUscm1s&k=Fx%2F2jEBXFAGA).
