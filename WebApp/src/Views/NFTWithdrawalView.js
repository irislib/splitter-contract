import React from "react";
import {
  withdrawal,
  loadCurrentContent,
  loadCurrentContent2,
} from "../util/interact.js";
import { Component } from "react/cjs/react.production.min.js";

class NFTWithdrawalView extends Component{
    constructor(){
        super();
        this.state = {status:"",data: "-",data2: "-",nftCollectionInput: "0x39Ec448b891c476e166b3C3242A90830DB556661"};
        this.updateCollectionInput = this.updateCollectionInput.bind(this);
    }

    onUpdatePressed = async () => {
        if(this.state.nftCollectionInput == ""){
          return;
        }
        const data = await loadCurrentContent(this.state.nftCollectionInput,this.props.walletAddress);
        console.log(data.toString());
        this.setState({data: data.toString()});
        const data2 = await loadCurrentContent2(this.state.nftCollectionInput);
        console.log(data2.toString());
        this.setState({data2: data2.toString()});
    }
    
    onWithdrawalPRessed = async () => { 
        const { status } = await withdrawal(this.state.nftCollectionInput,this.props.walletAddress);
        console.log(status.toString());
        this.setState({status:status});
    }
    updateCollectionInput(e){
        console.log(e);
        this.setState({nftCollectionInput: e});
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
                    <th>{this.state.data} </th>
                  </tr>
                  <tr>
                    <th>Total NFTs released: </th>
                    <th>{this.state.data2} </th>
                  </tr>
              </table>
            <button id="publish" onClick={this.onUpdatePressed}>
              Get withdrawal Amount
            </button>
            <button id="withdrawal" onClick={this.onWithdrawalPRessed}>
              Withdrawal NFTs
            </button>
            <p>Are there NFTs missing from Balances? Add them <a>here</a></p>
            <div>
              
            </div>
          </div>

        );
    }
}

export default NFTWithdrawalView;
