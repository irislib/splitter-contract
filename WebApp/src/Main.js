import React from "react";
import { useEffect, useState } from "react";
import NFTWithdrawalView from "./Views/NFTWithdrawalView.js";
import Menu from "./Views/Menu.js";
import {
  splitterContract,
  connectWallet,
  getCurrentWalletConnected,
} from "./util/interact.js";
import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom";

import alchemylogo from "./alchemylogo.svg";
import ETHWithdrawalView from "./Views/ETHWithdrawalView.js";
import TokenWithdrawalView from "./Views/TokenWithdrawalView.js";
const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState("-");
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
        <table id="organisationtable">
                  <tr>
                    <th>Your Shares in Organisation: </th>
                    <th>{data} </th>
                  </tr>
              </table>
        </div>
        <Router>
        <Routes >
          <Route path="/NFT" element={<NFTWithdrawalView walletAddress={walletAddress}/>} />
          <Route path="/ETH" element={<ETHWithdrawalView />} />
          <Route path="/Token" element={<TokenWithdrawalView />} />
          <Route path="/"  element={<Menu />} />
        </Routes >
        </Router>
        </div>
      </div>
    </div>
  );
};

export default HelloWorld;
