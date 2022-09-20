import React from "react";
import { Component } from "react/cjs/react.production.min.js";

class Menu extends Component{
    onClick1(e,href){
        e.preventDefault();
        window.location.href=href;
    }
    render(){
        return(
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
        );
    }
}
export default Menu;
