import React from "react";
import {Component} from "react/cjs/react.production.min.js";
import {deploy} from "./util/interact.js";
class Deploy extends Component{
    constructor(){
        super();
        this.state = {status:"",addressArray: [],sharesArray: [],walletAddress: "",orga: "",payees: new Map(),tmpadress:"",tmpshares:""};;
    }

    onDeployPressed = async () => {
        
        let payeesA = [];
        let sharesA = [];
        this.state.payees.forEach((address,shares) =>{payeesA.push(address);sharesA.push(shares)});
        console.log(payeesA);
        const status = await deploy(this.props.walletAddress,payeesA,sharesA);
        console.log(status.toString());
        this.setState({status:status});
    }

    addPayee(){
        if(this.state.tmpshares == "" || this.state.tmpadress == ""){
            this.setState({status:"Address and amount of Stock cant be empty!"});
            return;
        }
        let map = this.state.payees;
        map.set(this.state.tmpshares,this.state.tmpadress);
        this.setState({payees: map});
    }
    updatePayeeAddress(e){
        this.setState({tmpadress: e});
    }
    updatePayeeShares(e){
        this.setState({tmpshares: e});
    }
    render(){
        let test =[];
        this.state.payees.forEach((address,shares) =>{
            console.log(address);
            test.push(<> <tr><th><b>Payee: </b> {address}</th> <th><b>Shares: </b>{shares}</th> </tr></>)})
        return(
            <>
            <h2 style={{ paddingTop: "0px" }}>Deploy Splitter Contract:</h2>
            {this.state.status}
            <div>
            <table id="organisationtable">
            {test}
            </table> 
                <h3>Add Payee</h3>
                <input
                type="text"
                placeholder="Address"
                onChange={(e) => this.updatePayeeAddress(e.target.value)}
                value={this.state.tmpadress}
                />
                <input
                type="number"
                placeholder="Shares"
                onChange={(e) => this.updatePayeeShares(e.target.value)}
                value={this.state.tmpshares}
                />   
            </div>
            <div>
                <button id="publish" onClick={(e) => this.addPayee()} >
                Add Payee
                </button>

                <button id="publish" onClick={() => this.onDeployPressed()} >
                Deploy
                </button>
            </div>
            </>
        );
    }
}
export default Deploy;