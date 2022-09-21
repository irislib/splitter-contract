import React from "react";
import { useEffect, useState } from "react";
import {
  splitterContract,
  connectWallet,
  getCurrentWalletConnected,
} from "./util/interact.js";
import alchemylogo from "./alchemylogo.svg";
import { Component } from "react/cjs/react.production.min.js";
import { render } from "@testing-library/react";

class Main extends Component {
  //state variables
  //collection: 0x39Ec448b891c476e166b3C3242A90830DB556661
  //called only once
  constructor(){
    super();
    this.state = {status:"",data: "-",walletAddress: "",orga: ""};
   // this.updateCollectionInput = this.updateCollectionInput.bind(this);
}
componentDidMount(){

  const { address, status } = async() => { await getCurrentWalletConnected()};
  this.setState({status:status,walletAddress:address});
  this.addWalletListener();
}

  addWalletListener() { 
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          this.setState({status:"Enter the NFT collection address in the text-field above.",walletAddress:accounts[0]});
        } else {
          this.setState({status:"🦊 Connect to Metamask using the top right button.",walletAddress:""});
        }
      });
    } else {
      this.setState({status:
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
    });
    }
  }

  onClick1(e,href){
    e.preventDefault();
    window.location.href=href;
  };

  render()
  { 
    return(
    <>
        <h2 style={{ paddingTop: "0px" }}>Splitter Contract: <a target="_blank" href={"https://goerli.etherscan.io/address/"+this.props.orga}>{this.props.orga.toString().slice(0,4)}...</a></h2>
        <div>
        <table id="organisationtable">
                  <tr>
                    <th>Your Shares in Organisation: </th>
                    <th>{this.state.data} </th>
                  </tr>
              </table>
        </div>
        <div>
            <button id="publish" onClick={(e) => this.onClick1(e,"/NFT")} >
            Withdrawal NFTs
            </button>

            <button id="publish" onClick={(e) => this.onClick1(e,"/ETH")} >
            Withdrawal ETH
            </button>

            <button id="publish" onClick={(e) => this.onClick1(e,"/Token")} >
            Withdrawal Token
            </button>
        </div>
        </>
    )
  };
}

export default Main;
