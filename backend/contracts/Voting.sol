//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IncrementalBinaryTree.sol";

interface IVerifier {
  function verifyProof(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[4] memory input
  ) external view returns (bool);
}


contract Voting {

    mapping(uint8 => IVerifier) internal verifiers;

    enum PollStatus{
        Created,
        Started,
        Ended
    }

    struct Poll {
        uint pollId;
        PollStatus pollStatus;
        string title;
        address creator;
        uint quorum;
        uint[] votes; // 0 or 1
        uint createdAt;
    }

    using IncrementalBinaryTree for IncrementalTreeData;
    uint256 constant SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    uint256 constant TREE_ZERO_VALUE = uint256(keccak256(abi.encodePacked("Semaphore"))) % SNARK_SCALAR_FIELD;
    uint8 constant DEPTH = 20; 
    uint public pollIdCounter;
    uint[] public pollIds;
    
    mapping(uint256 => Poll) public polls;
    mapping(uint256 => bool) public registeredCommitmentsMapping;
    uint[] public registeredCommitments;
    mapping(uint256 => bool) public nullifierHashes;
    IncrementalTreeData public commitmentTree;
    IVerifier zkVerfier;


    event CommitmentRegistered(address indexed, uint indexed);
    event PollCreated(uint indexed, address indexed);
    event PollStarted(uint indexed, address indexed);
    event PollEnded(uint indexed, address indexed);
    event Voted(uint indexed,uint indexed);

    constructor(address _verifier) {
        commitmentTree.init(DEPTH, TREE_ZERO_VALUE);
         zkVerfier =IVerifier(_verifier);
       
    }

    
    modifier onlyCreator(uint256 pollId) {
        require(polls[pollId].creator == msg.sender, "Not creator");
        _;
    }

    // TODO verify zkp here as well
    // ATM anyone can create the poll 
    function createPoll(
        uint256 _identityCommitment,
        string memory _title,
        uint _quorum
    ) public  {
        require(registeredCommitmentsMapping[_identityCommitment],"No commitment");
        Poll memory poll;

        poll.creator = msg.sender;
        poll.pollId = pollIdCounter;
        poll.title = _title;
        poll.quorum=_quorum;
        poll.createdAt=block.timestamp;
        poll.pollStatus=PollStatus.Created;
        polls[pollIdCounter] = poll;
        pollIds.push(pollIdCounter);
        pollIdCounter+=1;
        emit PollCreated(pollIdCounter,  msg.sender);
    }

      function regsiterCommitment(uint256 _identityCommitment) public {
        require(registeredCommitmentsMapping[_identityCommitment]==false,"Duplicate commitment");
        
        registeredCommitmentsMapping[_identityCommitment]=true;
        commitmentTree.insert(_identityCommitment);
        registeredCommitments.push(_identityCommitment);
         emit CommitmentRegistered(msg.sender,_identityCommitment);
    }


    
    function startPoll(uint256 pollId) public onlyCreator(pollId) {
        require(polls[pollId].pollStatus == PollStatus.Created, "Cannot start");

        polls[pollId].pollStatus = PollStatus.Started;

        emit PollStarted(pollId, msg.sender);
    }

    function castVote(
        uint256 _vote,
        uint256 _nullifierHash,
        uint256 _pollId,
        uint256[8] calldata _proof,uint256[4] calldata _input
    ) public {
        Poll storage poll = polls[_pollId];

        require(poll.pollStatus == PollStatus.Started, "Poll not started");
        require(nullifierHashes[_nullifierHash] == false, "Invalid nullifier");

        require(zkVerfier.verifyProof(
        [_proof[0], _proof[1]],
        [[_proof[2], _proof[3]], [_proof[4], _proof[5]]],
        [_proof[6], _proof[7]],
        _input
      ),"Invalid proof");
        // Prevent double-voting (nullifierHash = hash(pollId + identityNullifier)).
        nullifierHashes[_nullifierHash]=true;
        poll.votes.push(_vote);
        
        emit Voted(_pollId, _vote);
    }


    function endPoll(uint256 pollId) public onlyCreator(pollId) {
        require(polls[pollId].pollStatus == PollStatus.Started, "Poll not started");

        polls[pollId].pollStatus = PollStatus.Ended;

        emit PollEnded(pollId,msg.sender );
    }

    function getPolls() public view returns (uint[] memory){
        return pollIds;
    }



    function getAllPolls() public view returns (Poll[] memory){
        
         Poll[] memory allPolls = new Poll[](pollIds.length);
        
        for(uint i =0;i<pollIdCounter;++i){
                allPolls[i]=polls[i];
        }

        return allPolls;
    }


     function getPollDetailsById(uint _pollId) public view returns (Poll memory){
        return polls[_pollId];
    }

  function getRegisteredCommitments() public view returns (uint[] memory){
        return registeredCommitments;
    }
}