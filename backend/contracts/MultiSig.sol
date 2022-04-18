// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;


contract MultiSig {
 event Deposit (address indexed sender, uint amount, uint balance);
 event CreateTx (address indexed to,uint txId, uint amount);
 event ExecuteTx (address indexed to,uint txId, uint amount);
 event ApproveTx (address indexed owner,uint txId);
 event RemoveApprovalTx (address indexed owner,uint txId);

 struct Transaction{
     uint txId;
     uint amount;
     address to;
     uint approvedCount;
     bool executed;
     bytes data;
 }
 
 uint approvalCountRequired;
 mapping(address=>bool) isOwner;
 mapping(uint=>mapping(address=>bool)) isConfirmed;

 Transaction[] public transactions;

 address[] owners;
    constructor(address[] memory _owners, uint approvalCount){
        require(_owners.length > 0, "owners required");
        require(approvalCount!=0 && approvalCount<_owners.length, "incorrect count");
     
     for(uint i =0; i < _owners.length;i++){
         require(_owners[i]!=address(0),"Invalid address");
         require(!isOwner[_owners[i]],"Owner not unique");

         isOwner[_owners[i]]=true;
         owners.push(_owners[i]);
    }
    approvalCountRequired=approvalCount;
 }
     receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
     }

 modifier onlyOwner() {
     require(isOwner[msg.sender],"Not a valid owner.");
     _;
 }
 modifier txValid(uint _txId){
     require(_txId<transactions.length,"Invlid txId");
     _;
 }
 modifier notExectuted(uint _txId) {
     require(!transactions[_txId].executed,"Not executed");
     _;
 }
 modifier notConfirmed(uint _txId){
     require(!isConfirmed[_txId][msg.sender],"Not confirmed.");
     _;
 }
 function getOwner() public view returns(address[] memory){
     return owners;
 }

 function getTransactionDetails(uint _txId) public view returns(Transaction memory){
     require(_txId>=0,"invalid txId");
     return transactions[_txId];
 }

function createTx(address _to, uint _amount, bytes memory _data) public  onlyOwner {
    require(_amount>0, "amount cannot be 0");
    uint txIndex = transactions.length;

    transactions.push(Transaction({txId:txIndex,to:_to,amount:_amount,executed:false, approvedCount:0,data:_data}));
    
    emit CreateTx(_to,txIndex,_amount);
}


function approveTx(uint _txId) public onlyOwner txValid(_txId) notExectuted(_txId) notConfirmed(_txId) {

    Transaction storage transaction = transactions[_txId];
    transaction.approvedCount+=1;
    isConfirmed[_txId][msg.sender]=true;
    
    emit ApproveTx(msg.sender,_txId);
}

function executeTx(uint _txId) public onlyOwner txValid(_txId) notExectuted(_txId) {
    require(transactions[_txId].approvedCount>=approvalCountRequired,"Approval count not met.");

    Transaction storage transaction = transactions[_txId];
    transaction.executed=true;
    
    (bool success,)=transaction.to.call{value:transaction.amount}(transaction.data);
    require(success, "tx failed");
    emit ExecuteTx(transaction.to,_txId,transaction.amount);
}
function revokeConfirmation(uint _txId) public onlyOwner txValid(_txId) notExectuted(_txId){
     require(isConfirmed[_txId][msg.sender],"Tx is already not confirmed.");
    Transaction storage transaction = transactions[_txId];
    transaction.approvedCount-=1;
    emit RemoveApprovalTx(msg.sender, _txId);
}


}