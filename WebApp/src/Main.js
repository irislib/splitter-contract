import React from "react";
import { useEffect, useState } from "react";
import {
  splitterContract,
  connectWallet,
  withdrawal,
  loadCurrentContent,
  loadCurrentContent2,
  getCurrentWalletConnected,
} from "./util/interact.js";

import alchemylogo from "./alchemylogo.svg";
const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState("-");
  const [data2, setData2] = useState("-");
  const [nftCollectionInput, setNewCollectionInput] = useState("");
  const [orga, setorga] = useState("0x258eE9CAb039295B155Bd3487Df04542975918F3");
  //collection: 0x39Ec448b891c476e166b3C3242A90830DB556661
  //called only once
  useEffect(async () => {
    
    addSmartContractListener();

    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addSmartContractListener() { 
    
  }

  function addWalletListener() { 
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Enter the NFT collection address in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };
  
  const onUpdatePressed = async () => {
    if(nftCollectionInput == ""){
      return;
    }
    const data = await loadCurrentContent(nftCollectionInput,walletAddress);
    console.log(data.toString());
    setData(data.toString());
    const data2 = await loadCurrentContent2(nftCollectionInput);
    console.log(data2.toString());
    setData2(data2.toString());
  };
  const onWithdrawalPRessed = async () => { 
    const { status } = await withdrawal(nftCollectionInput,walletAddress);
    console.log(status.toString());
    setStatus(status);
  };
  
  return (
    <div class="container" id="container">
      <div class="topbar">
      <img id="logo" src={alchemylogo}></img>
      <button id="walletButton" onClick={connectWalletPressed}>
          {walletAddress.length > 0 ? (
            "Connected: " +
            String(walletAddress).substring(0, 6) +
            "..." +
            String(walletAddress).substring(38)
          ) : (
            <span>Connect Wallet</span>
          )}
        </button>
      </div>
    
    <div class="containerInner">
      <div class="textContainer">
        <h2 style={{ paddingTop: "0px" }}>Splitter Contract: <a target="_blank" href={"https://goerli.etherscan.io/address/"+orga}>{orga.toString().slice(0,4)}...</a></h2>
        <div>
          <input
          type="text"
          placeholder="NFT collection adress"
          onChange={(e) => setNewCollectionInput(e.target.value)}
          value={nftCollectionInput}
          />
          <p id="status">{status}</p>
          <h2 style={{ paddingTop: "18px" }}>NFT Balances</h2>
            <table id="organisationtable">
                <tr>
                  <th>Amount of NFTs to withdrawal: </th>
                  <th>{data} </th>
                </tr>
                <tr>
                  <th>Total NFTs released: </th>
                  <th>{data2} </th>
                </tr>
            </table>
          <button id="publish" onClick={onUpdatePressed}>
            Get withdrawal Amount
          </button>
          <button id="withdrawal" onClick={onWithdrawalPRessed}>
            Withdrawal NFTs
          </button>
        </div>
          <p>Are there NFTs missing from Balances? Add them <a>here</a></p>
          <div>
            
          </div>
      </div>
    </div>
    </div>
  );
};

export default HelloWorld;
