// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (finance/PaymentSplitter.sol)
// Added functions for Iris.to

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract NFTSplitter is IERC721Receiver {
    address[] private _payees;
    uint256 private _totalShares;
    uint256 private _totalReleased;

    mapping(address => uint256) private _shares;

    mapping(IERC721 => uint256[]) private _erc721Received;
    mapping(IERC721 => uint256) private _erc721TotalReleased;
    mapping(IERC721 => mapping(address => uint256)) private _erc721Released;


    constructor(address[] memory payees, uint256[] memory shares_)
    {
        require(payees.length == shares_.length, "PaymentSplitter: payees and shares length mismatch");
        require(payees.length > 0, "PaymentSplitter: no payees");

        for (uint256 i = 0; i < payees.length; i++) {
            _addPayee(payees[i], shares_[i]);
        }
    }

    function transferNft(IERC721 token,address account) public payable {
        require(_shares[account] > 0, "PaymentSplitter: account has no shares");
        require((_erc721Received[token].length - (_erc721Received[token].length % _totalShares)) % _totalShares == 0,"PaymentSplitter: cant devide nfts");
        uint256 payment = releasable(token,account);

        require(payment != 0, "PaymentSplitter: account is not due payment");

        _erc721TotalReleased[token] += payment;
        unchecked {
            _erc721Released[token][account] += payment;
        }

        uint256[] memory leftnfts = new uint256[](_erc721Received[token].length-payment);
        uint256 j;

        for(uint256 i = 0; i < _erc721Received[token].length; i++){
            if(i < payment){
                IERC721(token).safeTransferFrom(address(this),account, _erc721Received[token][i]);
            }else{
                leftnfts[j] = _erc721Received[token][i];
                j++;
            }
        }
        _erc721Received[token] = leftnfts;
        
    }

    function released(IERC721 token,address account) public view returns (uint256) {
        return _erc721Released[token][account];
    }

    function releasable(IERC721 token,address account) public view returns (uint256) {
        uint256 totalReceived = _erc721Received[token].length + totalReleased(token);
        return _pendingPayment(account, totalReceived, released(token,account));
    }

    function totalReleased(IERC721 token) public view returns (uint256) {
        return _erc721TotalReleased[token];
    }

    function getNFts(IERC721 token ,uint256 pos) public view returns (uint256){
        return _erc721Received[token][pos];
    }

    function onERC721Received(address, address, uint256 _tokenid, bytes calldata) public override returns (bytes4) {
            _erc721Received[IERC721(msg.sender)].push(_tokenid);
            return this.onERC721Received.selector;
    }

    function _pendingPayment(
        address account,
        uint256 totalReceived,
        uint256 alreadyReleased
    ) private view returns (uint256) {
        return ((totalReceived * _shares[account]) / _totalShares) - alreadyReleased;
    }

    function _addPayee(address account, uint256 shares_) private {
        require(account != address(0), "PaymentSplitter: account is the zero address");
        require(shares_ > 0, "PaymentSplitter: shares are 0");
        require(_shares[account] == 0, "PaymentSplitter: account already has shares");

        _payees.push(account);
        _shares[account] = shares_;
        _totalShares = _totalShares + shares_;
    }
}