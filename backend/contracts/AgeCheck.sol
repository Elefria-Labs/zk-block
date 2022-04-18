// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.4;


interface IVerifier {
  function verifyProof(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[2] memory input
  ) external view returns (bool);
}

contract AgeCheck{

    event AgeVerfied(address person,bool verfied);

    IVerifier zkVerfier;    
    
    constructor(address _verifier) {
        zkVerfier =IVerifier(_verifier);
    }
 
    function verifyAge(uint256[8] calldata _proof,uint256[2] calldata _input) public {
       require(zkVerfier.verifyProof(
        [_proof[0], _proof[1]],
        [[_proof[2], _proof[3]], [_proof[4], _proof[5]]],
        [_proof[6], _proof[7]],
        _input
        ),"Below Age limit");
  
       emit AgeVerfied(msg.sender,true);
       
    }
}