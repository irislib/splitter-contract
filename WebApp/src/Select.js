import React from "react";
import { useEffect, useState } from "react";
import Deploy from "./Deploy.js";
import ETHWithdrawalView from "./Views/ETHWithdrawalView.js";
import TokenWithdrawalView from "./Views/TokenWithdrawalView.js";
import NFTWithdrawalView from "./Views/NFTWithdrawalView.js";
import alchemylogo from "./assets/android-chrome-192x192.png";
import Main from './Main';
import {connectWallet, getCurrentWalletConnected,contractAddress} from "./util/interact.js";
import {BrowserRouter as Router,Routes ,Route} from "react-router-dom";

const Select = () => {
    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [orga, setOrga] = useState("0x4419Fa19BBCbc6d3408D7d428006c8e1f96640a1");
    useEffect(async () => {
    
        addSmartContractListener();
    
        const { address, status } = await getCurrentWalletConnected();
    
        setWallet(address);
        setStatus(status);
    
        addWalletListener();
      }, []);

      function addWalletListener() { 
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setWallet(accounts[0]);
              setStatus("");
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
      function addSmartContractListener() { 
    
    }
    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
      };

    const onClick1 =(e,href) =>{
        console.log(window.contractAddress);
        window.contractAddress = orga;
        e.preventDefault();
        window.location.href=href;
      };
    const view = () =>{
        return(
            <div>
                <h2 style={{ paddingTop: "18px" }}>Enter Splitter Contract Address </h2>
                {status}
                    <input
                    type="text"
                    placeholder="NFT collection adress"
                    onChange={(e) => setOrga(e.target.value)}
                    value={orga}
                    />
                    
                    <button id="publish" onClick={(e) => onClick1(e,"/Contract")} >
                    Select
                    </button>
                    
                    <button id="publish" onClick={(e) => onClick1(e,"/Deploy")} >
                    Deploy new Contract
                    </button>
            </div>

        );
    }
    return(
        <div class="container" id="container">
            <div class="topbar">
                    <a href="/"><img id="logo" src={alchemylogo}></img></a>
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
                <h1>Iris Splitter Contract Manager</h1>
                    <div>
                    <Router>
                        <Routes >
                            <Route path="/NFT" element={<NFTWithdrawalView walletAddress={walletAddress}/>} />
                            <Route path="/ETH" element={<ETHWithdrawalView walletAddress={walletAddress}/>} />
                            <Route path="/Token" element={<TokenWithdrawalView walletAddress={walletAddress}/>} />
                            <Route path="/Contract"  element={<Main orga={orga} />} />
                            <Route path="/Deploy"  element={<Deploy walletAddress={walletAddress}/>} />
                            <Route path="/"  element={view()} />
                        </Routes >
                    </Router>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Select;