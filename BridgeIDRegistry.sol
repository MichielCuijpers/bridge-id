pragma solidity ^0.4.4;

contract BridgeIDRegistry {

	mapping (address => bool) ofAge;

	address owner;

	modifier onlyOwner {
        if (msg.sender != owner) {
			throw;
		}
		_;
	}

	function BridgeIDRegistry() {
		owner = msg.sender;
 	}

	function setOwner(address ownerAddr) {
		if(owner != 0x0 && msg.sender != owner){
			throw;
		}
		owner = ownerAddr;
	}

	function remove(){
		if(msg.sender == owner){
			selfdestruct(owner);
		}
	}

	function setOfAge(address addr, bool truth) {
		ofAge[addr] = truth;
	}

	function getOfAge(address addr) returns(bool) {
		return ofAge[addr];
	}
}
