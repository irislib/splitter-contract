import React from "react";
import {
  releasableERC20,
  totalReleasedERC20,
} from "../util/interact.js";
import { Component } from "react/cjs/react.production.min.js";

class TokenWithdrawalView extends Component{
    constructor(){
        super();
        this.state = {status:"",withdrawalAmount: "-",totalRelease: "-",nftCollectionInput: ""};
    }
    onUpdatePressed = async () => {
        const withdrawalAmount = await releasableERC20(this.props.walletAddress);
        console.log(withdrawalAmount.toString());
        this.setState({withdrawalAmount: withdrawalAmount.toString()});
        const totalRelease = await totalReleasedERC20(this.state.nftCollectionInput);
        console.log(totalRelease.toString());
        this.setState({totalRelease: totalRelease.toString()});
    }
    render(){
        return(
            <div class="">
            <h2 style={{ paddingTop: "18px" }}>Withdrawal Token </h2>
                <input
                type="text"
                placeholder="Token adress"
                onChange={(e) => this.updateCollectionInput(e.target.value)}
                value={this.state.nftCollectionInput}
                />
                <p id="status">{this.state.status}</p>
                <table id="organisationtable">
                    <tr>
                        <th>Amount of Token to withdrawal: </th>
                        <th>{this.state.withdrawalAmount} </th>
                    </tr>
                </table>
                <button id="publish" onClick={this.onUpdatePressed}>
                Get withdrawal Amount
                </button>
                <button id="withdrawal" onClick={this.onWithdrawalPRessed}>
                Withdrawal Token
                </button>
            </div>
        );
    }
}

export default TokenWithdrawalView;