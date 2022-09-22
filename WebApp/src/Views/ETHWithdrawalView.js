import React from "react";
import {
  withdrawalETH,
  releasableETH,
  totalReleasedETH,
} from "../util/interact.js";
import { Component } from "react/cjs/react.production.min.js";

class ETHWithdrawalView extends Component{
    constructor(){
        super();
        this.state = {status:"",withdrawalAmount: "-",totalRelease: "-"};
    }
    onUpdatePressed = async () => {
      const withdrawalAmount = await releasableETH(this.props.walletAddress);
      console.log(withdrawalAmount.toString());
      this.setState({withdrawalAmount: withdrawalAmount.toString()});
      const totalRelease = await totalReleasedETH(this.state.nftCollectionInput);
      console.log(totalRelease.toString());
      this.setState({totalRelease: totalRelease.toString()});
  }
  
  onWithdrawalPRessed = async () => { 
      const { status } = await withdrawalETH(this.props.walletAddress);
      console.log(status.toString());
      this.setState({status:""});
  }
    render(){
        return (
            <div class="">
            <h2 style={{ paddingTop: "18px" }}>Withdrawal ETH </h2>
            <p id="status">{this.state.status}</p>
            
              <table id="organisationtable">
                  <tr>
                    <th>Amount of Wei to withdrawal: </th>
                    <th>{this.state.withdrawalAmount} </th>
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