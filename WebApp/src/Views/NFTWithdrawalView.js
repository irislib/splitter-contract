import React from "react";
import {
  withdrawalERC721,
  releasableERC721,
  totalReleasedERC721,
  safeTransferERC721,
} from "../util/interact.js";
import { Component } from "react/cjs/react.production.min.js";

class NFTWithdrawalView extends Component{
    constructor(){
        super();
        this.state = {status:"",withdrawalAmount: "-",totalRelease: "-",nftCollectionInput: "0x39Ec448b891c476e166b3C3242A90830DB556661",tokenid: ""};
        this.updateCollectionInput = this.updateCollectionInput.bind(this);
    }

    onUpdatePressed = async () => {
        if(this.state.nftCollectionInput == ""){
          return;
        }
        const withdrawalAmount = await releasableERC721(this.state.nftCollectionInput,this.props.walletAddress);
        console.log(withdrawalAmount.toString());
        this.setState({withdrawalAmount: withdrawalAmount.toString()});
        const totalRelease = await totalReleasedERC721(this.state.nftCollectionInput);
        console.log(totalRelease.toString());
        this.setState({totalRelease: totalRelease.toString()});
    }
    
    onWithdrawalPRessed = async () => { 
        const { status } = await withdrawalERC721(this.state.nftCollectionInput,this.props.walletAddress);
        console.log(status.toString());
        this.setState({status:status});
    }
    updateCollectionInput(e){
        console.log(e);
        this.setState({nftCollectionInput: e});
    }
    onTransferPressed = async () => { 
      const { status } = await safeTransferERC721(this.props.walletAddress,this.state.nftCollectionInput,this.state.tokenid);
      console.log(status.toString());
      this.setState({status:status});
  }
    render(){
        return(
            <div class="">
            <h2 style={{ paddingTop: "18px" }}>Withdrawal NFT </h2>
            <input
            type="text"
            placeholder="NFT collection adress"
            onChange={(e) => this.updateCollectionInput(e.target.value)}
            value={this.state.nftCollectionInput}
            />
            <p id="status">{this.state.status}</p>
            
              <table id="organisationtable">
                  <tr>
                    <th>Amount of NFTs to withdrawal: </th>
                    <th>{this.state.withdrawalAmount} </th>
                  </tr>
                  <tr>
                    <th>Total NFTs released: </th>
                    <th>{this.state.totalRelease} </th>
                  </tr>
              </table>
            <button id="publish" onClick={this.onUpdatePressed}>
              Get withdrawal Amount
            </button>
            <button id="withdrawal" onClick={this.onWithdrawalPRessed}>
              Withdrawal NFTs
            </button>
            <p>Are there NFTs missing from Balances? Add them here:</p>
            <div>
            <input
            type="text"
            placeholder="NFT token id"
            onChange={(e) => this.setState({tokenid: e.target.value})}
            value={this.state.tokenid}
            />
            <button id="publish" onClick={this.onTransferPressed}>
              Transfer
            </button>
            </div>
          </div>

        );
    }
}

export default NFTWithdrawalView;
