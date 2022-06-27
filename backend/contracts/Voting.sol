//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./IncrementalBinaryTree.sol";

interface IVerifier {
  function verifyProof(
    uint256[2] memory a,
    uint256[2][2] memory b,
    uint256[2] memory c,
    uint256[2] memory input
  ) external view returns (bool);
}

/// @title Semaphore voting contract.
/// @dev The following code allows you to create polls, add voters and allow them to vote anonymously.
contract SemaphoreVoting {
    /// @dev Gets a tree depth and returns its verifier address.
    mapping(uint8 => IVerifier) internal verifiers;

    enum PollStatus{
        Created,
        Started,
        Ended
    }

    struct Poll {
        uint pollId;
        PollStatus pollStatus;
        string pollTitle;
        address creator;
        uint quorum;
        uint[] votes; // 0 or 1
    }

    using IncrementalBinaryTree for IncrementalTreeData;
    uint256 constant SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    uint256 constant TREE_ZERO_VALUE = uint256(keccak256(abi.encodePacked("Semaphore"))) % SNARK_SCALAR_FIELD;
    uint8 constant DEPTH = 20; 
    uint pollIdCounter;
    
    mapping(uint256 => Poll) public polls;
    mapping(uint256 => bool) public registeredCommitments;
    mapping(uint256 => bool) public nullifierHashes;
    IncrementalTreeData public commitmentTree;
    IVerifier zkVerfier;


    event CommitmentRegistered(address indexed, uint indexed);
    event PollCreated(uint indexed, address indexed);
    event PollStarted(uint indexed, address indexed);
    event PollEnded(uint indexed, address indexed);
    event Voted(uint indexed,uint indexed);

    constructor(address _verifier) public {
        commitmentTree.init(DEPTH, TREE_ZERO_VALUE);
         zkVerfier =IVerifier(_verifier);
       
    }

    
    modifier onlyCreator(uint256 pollId) {
        require(polls[pollId].creator == msg.sender, "Not creator");
        _;
    }

    /// @dev See {ISemaphoreVoting-createPoll}.
    function createPoll(
        uint256 _identityCommitment,
        string memory _title,
        uint _quorum
    ) public  {
        require(registeredCommitments[_identityCommitment],"No commitment");
        Poll memory poll;

        poll.creator = msg.sender;
        poll.pollId = pollIdCounter;
        poll.quorum=_quorum;
        poll.pollStatus=PollStatus.Created;
        polls[pollIdCounter] = poll;
        pollIdCounter+=1;
        emit PollCreated(pollIdCounter,  msg.sender);
    }

      function addVoter(uint256 _identityCommitment) public {
        require(registeredCommitments[_identityCommitment]==false,"Duplicate commitment");
        
        registeredCommitments[_identityCommitment]=true;
        commitmentTree.insert(_identityCommitment);
         emit CommitmentRegistered(msg.sender,_identityCommitment);
    }

    // function addVoter(uint256 pollId, uint256 identityCommitment) public override onlyCreator(pollId) {
    //     require(polls[pollId].state == PollState.Created, "SemaphoreVoting: voters can only be added before voting");

    //     _addMember(pollId, identityCommitment);
    // }
    

    
    function startPoll(uint256 pollId) public onlyCreator(pollId) {
        require(polls[pollId].pollStatus == PollStatus.Created, "Cannot start");

        polls[pollId].pollStatus = PollStatus.Started;

        emit PollStarted(pollId, msg.sender);
    }

    function castVote(
        bytes32 _vote,
        uint256 _nullifierHash,
        uint256 _pollId,
        uint256[8] calldata _proof,uint256[2] calldata _input
    ) public {
        Poll memory poll = polls[_pollId];

        require(poll.pollStatus == PollStatus.Started, "Poll not started");
        require(nullifierHashes[_nullifierHash] == true, "Invalid nullifier");

         zkVerfier.verifyProof(
        [_proof[0], _proof[1]],
        [[_proof[2], _proof[3]], [_proof[4], _proof[5]]],
        [_proof[6], _proof[7]],
        _input
      );
        // Prevent double-voting (nullifierHash = hash(pollId + identityNullifier)).
        nullifierHashes[_nullifierHash]=true;
        // TODO fix
        uint[] storage votes = polls[_pollId].votes;
        
        emit Voted(_pollId, _vote);
    }


    function endPoll(uint256 pollId) public onlyCreator(pollId) {
        require(polls[pollId].pollStatus == PollStatus.Started, "Poll not started");

        polls[pollId].pollStatus = PollStatus.Ended;

        emit PollEnded(pollId,msg.sender );
    }
}