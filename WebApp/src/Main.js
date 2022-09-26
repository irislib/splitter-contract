import React from "react";
import {
  getCurrentWalletConnected,
  shares,
  totalShares,
} from "./util/interact.js";
import {Component} from "react/cjs/react.production.min.js";

class Main extends Component {

  constructor(){
    super();
    this.state = {status:"",shares: "-",totalShares: "-",walletAddress: "",orga: ""};;
  }

  componentDidMount(){
    this.updateState();
    this.addWalletListener();
  }
  updateState = async () =>{
    const { address, status } = await getCurrentWalletConnected();
    
    const _shares = await shares(address);
    const _totalShares = await totalShares();
    if(_shares === "" || _totalShares === "" || _totalShares === null || _shares === null){
      this.setState({status:"Cant find contract or connect Metamask"});
      return;
    }else{
      this.setState({status:status,walletAddress:address,shares:_shares.toString(),totalShares:_totalShares.toString()});
    }
    
    
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
          <a target="_blank" rel="noopener noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
    });
    }
  }

  onClick1(e,href){
    e.preventDefault();
    this.props.navigation(href);
  };

  render(){ 
    const pros = (parseFloat(this.state.shares) / parseFloat(this.state.totalShares)) * 100;
    return(
    <>
        <h2 style={{ paddingTop: "0px" }}>Splitter Contract: <a rel="noopener noreferrer" target="_blank" href={"https://goerli.etherscan.io/address/"+this.props.orga}>{this.props.orga.toString().slice(0,4)}...</a></h2>
        <div>
        <table id="organisationtable">
                  <tr>
                    <th>Your Shares in Organisation: </th>
                    <th>{this.state.shares} ({pros}%) </th>
                  </tr>
                  <tr>
                    <th>Total Shares in Organisation: </th>
                    <th>{this.state.totalShares} </th>
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
