import React from 'react';

require("dotenv").config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require("../contract-abi.json");
var contractAddress = "0x4419Fa19BBCbc6d3408D7d428006c8e1f96640a1";
const contractData = require("../PaymentSplitterV2.json");

export const splitterContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);
export const releasableERC721 = async (erc721,address) => { 
  const content = await splitterContract.methods.releasableERC721(erc721,address).call();
  return content;
};
export const releasableERC20 = async (erc20,address) => { 
  const content = await splitterContract.methods.releasable(erc20,address).call();
  return content;
};
export const releasableETH = async (address) => { 
  const content = await splitterContract.methods.releasable(address).call();
  return content;
};

export const totalReleasedERC721 = async (erc721) => { 
  const content = await splitterContract.methods.totalReleasedERC721(erc721).call();
  return content;
};
export const totalReleasedERC20 = async (erc20) => { 
  const content = await splitterContract.methods.totalReleased(erc20).call();
  return content;
};
export const totalReleasedETH = async () => { 
  const content = await splitterContract.methods.totalReleased().call();
  return content;
};
export const shares = async (address) => { 
  const content = await splitterContract.methods.shares(address).call();
  return content;
};
export const totalShares = async () => { 
  const content = await splitterContract.methods.totalShares().call();
  return content;
};

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const obj = {
            status: "",
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
          status: "",
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

export const withdrawalERC721 = async (erc721,address) => {
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
    data: splitterContract.methods.releaseERC721(erc721,address).encodeABI(),
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
export const safeTransferERC721 = async (address,erc721,tokenid) => {
  //input error handling
  if (!window.ethereum || erc721 === null) {
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
    data: splitterContract.methods.safeTransfer(erc721,tokenid).encodeABI(),
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
export const withdrawalETH = async (address) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to withdrawal NFTs",
    };
  }

  if (address.trim() === "") {
    return {
      status: "Address cannot be an empty string.",
    };
  }
  //set up transaction parameters
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: address, // must match user's active address.
    data: splitterContract.methods.release(address).encodeABI(),
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
export const deploy = async (address,payees,shares) => {
  //input error handling
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your Metamask wallet to withdrawal NFTs",
    };
  }
  console.log(payees);
  if (address.trim() === "") {
    return {
      status: "Address cannot be an empty string.",
    };
  }
  //set up transaction parameters
  console.log(contractData);
  splitterContract.options.data = contractData.bytecode;

  splitterContract.deploy({
      arguments: [payees, shares]
  })
  .send({
      from: address,
      
  })
  .then(function(newContractInstance){
      console.log(newContractInstance.options.address) // instance with the new contract address
  });
  //sign the transaction
  try {
    
  } catch (error) {
    return {
      status: error.message,
    };
  }
};