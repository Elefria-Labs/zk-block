const { expect } = require("chai");
const { ethers } = require("hardhat");

let multiSig;
const TX_DATA = "";
before("*", async () => {
  const [a0, a2, a3, a4] = await hre.ethers.getSigners();
  const owners = [a0.address, a2.address, a3.address, a4.address];
  const numApprovals = Math.ceil([a0, a2, a3, a4].length / 2 + 1);
  const MultiSig = await ethers.getContractFactory("MultiSig");
  multiSig = await MultiSig.deploy(owners, numApprovals);
  await multiSig.deployed();
  console.log(multiSig.address);
});

describe("MultiSig contract", () => {
  it("Should be able to get all owners", async () => {
    const tx = await multiSig.getOwner();
    expect(tx.length).to.equal(4);
  });

  it("An owner should be able to create a multisig tx", async () => {
    const [a0, a2, a3, a4, a5] = await hre.ethers.getSigners();
    const tx = await multiSig.createTx(
      a5.address,
      1,
      ethers.utils.toUtf8Bytes(TX_DATA)
    );
    expect(tx.hash).to.not.equal(null);
    //expect(1).to.equal(1);
  });

  it("An owner should be able to retrieve a multisig tx", async () => {
    const [a0, a2, a3, a4, a5] = await hre.ethers.getSigners();
    const tx = await multiSig.getTransactionDetails(0);
    expect(tx.hash).to.not.equal(null);
    expect(tx.txId).to.equal(0);
    expect(tx.to).to.equal(a5.address);
    expect(tx.executed).to.equal(false);
    expect(tx.data).to.equal(
      ethers.utils.hexlify(ethers.utils.toUtf8Bytes(TX_DATA))
    );
  });

  it("An owner should be able to approve a multisig tx", async () => {
    const tx = await multiSig.approveTx(0);
    expect(tx.hash).to.not.equal(null);
    const retrieve = await multiSig.getTransactionDetails(0);
    expect(retrieve.hash).to.not.equal(null);
    expect(retrieve.approvedCount).to.equal(1);
  });

  it("An owner should be able to cancel approval for a multisig tx", async () => {
    const tx = await multiSig.revokeConfirmation(0);
    expect(tx.hash).to.not.equal(null);
    const retrieve = await multiSig.getTransactionDetails(0);
    expect(retrieve.hash).to.not.equal(null);
    expect(retrieve.approvedCount).to.equal(0);
  });
});
