import React from "react";
import {
  splitterContract,
  connectWallet,
  withdrawal,
  loadCurrentContent,
  loadCurrentContent2,
  getCurrentWalletConnected,
} from "../util/interact.js";
import { Component } from "react/cjs/react.production.min.js";

class ETHWithdrawalView extends Component{
    constructor(){
        super();
        this.state = {status:"",data: "-",data2: "-",nftCollectionInput: ""};
    }
    
    render(){
        return (
            <div class="">
            <h2 style={{ paddingTop: "18px" }}>Withdrawal ETH </h2>
            <p id="status">{this.state.status}</p>
            
              <table id="organisationtable">
                  <tr>
                    <th>Amount of ETH to withdrawal: </th>
                    <th>{this.state.data} </th>
                  </tr>
              </table>
            <button id="publish" onClick={this.onUpdatePressed}>
              Get withdrawal Amount
            </button>
            <button id="withdrawal" onClick={this.onWithdrawalPRessed}>
              Withdrawal ETH
            </button>
          </div>
        );
    }
}

export default ETHWithdrawalView;