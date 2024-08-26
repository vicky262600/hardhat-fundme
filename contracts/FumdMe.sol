// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "./PriceConverter.sol";

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    address[] public funders;
    mapping(address => uint256) public addressToAmountSent;
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address public immutable i_owner;
    AggregatorV3Interface public priceFeed;

    // constant and immutable help to save the gas

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) > MINIMUM_USD,
            "Didnt sent enough"
        ); // 1e18 == 1ETH
        funders.push(msg.sender);
        addressToAmountSent[msg.sender] += msg.value;
    }

    function withdraw() public onlyOwner {
        // require(msg.sender == owner, "only owner can withdraw the ");
        for (uint i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmountSent[funder] = 0;
        }
        // reset array
        // funders = new address[](0);

        // // transfer
        // payable(msg.sender).transfer(address(this).balance);

        // // send
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Sant failed");

        // //call
        // (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        // require(callSuccess, "sdkfj");
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner, "only owner can withdraw the ");
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
