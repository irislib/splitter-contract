//export const splitterContract;
import React from 'react';
require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3("wss://eth-goerli.g.alchemy.com/v2/lQPWvm74kzjNOKLKF6sIY66VSyrqBw3I");
const contractABI = require("../contract-abi.json");
const contractAddress = "0x258eE9CAb039295B155Bd3487Df04542975918F3";

export const splitterContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);
export const loadCurrentContent = async (erc721,address) => { 
  const content = await splitterContract.methods.releasable(erc721,address).call();
  return content;
};
export const loadCurrentContent2 = async (erc721) => { 
  const content = await splitterContract.methods.totalReleased(erc721).call();
  return content;
};
export const connectWallet = async () => {
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const obj = {
            status: "Enter the address of NFT collection above.",
            address: addressArray[0],
          };
          return obj;
        } catch (err) {
          return {
            address: "",
            status: err.message,
          };
        }
      } else {
        return {
          address: "",
          status: (
            <span>
              <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                  You must install Metamask, a virtual Ethereum wallet, in your
                  browser.
                </a>
              </p>
            </span>
          ),
        };
      }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "Enter the address of NFT collection above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const withdrawal = async (erc721,address) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to withdrawal NFTs",
    };
  }

  if (erc721.trim() === "") {
    return {
      status: "Token cannot be an empty string.",
    };
  }
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: splitterContract.methods.transferNft(erc721,address).encodeABI(),
  };

  //sign the transaction
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    };
  } catch (error) {
    return {
      status: error.message,
    };
  }
};
