import { expect } from "chai"
import { Signer } from "ethers"
import { ethers } from "hardhat"
import { AgeCheck } from "../build/typechain/AgeCheck"
import { groth16 } from "snarkjs"

describe("AgeCheck", () => {
  let ageCheckContract: AgeCheck
  let accounts: Signer[]

  before(async () => {
    const verifierContract = await ethers.getContractFactory("Verifier")
    const plonkVerifierContract = await ethers.getContractFactory("PlonkVerifier")
    accounts = await ethers.getSigners()

    const verifierDeployed = await verifierContract.deploy()
    const plonkVerifierDeployed = await plonkVerifierContract.deploy()
    console.log("verifierContract", verifierDeployed.address)

    const ageCheck = await ethers.getContractFactory("AgeCheck")
    ageCheckContract = await ageCheck.deploy(verifierDeployed.address, plonkVerifierDeployed.address)
    console.log("ageCheckContract", ageCheckContract.address)
  })

  it("Should verify if age is above 18", async () => {
    const wasmFilePath = "./build/snark/circuit.wasm"
    const finalZkeyPath = "./build/snark/circuit_final.zkey"
    const age = 21
    const ageLimit = BigInt(18)
    const witness = {
      age,
      ageLimit
    }

    const { proof, publicSignals } = await groth16.fullProve(witness, wasmFilePath, finalZkeyPath, null)

    // TODO: optimize
    const solidityProof = [
      proof.pi_a[0],
      proof.pi_a[1],
      proof.pi_b[0][1],
      proof.pi_b[0][0],
      proof.pi_b[1][1],
      proof.pi_b[1][0],
      proof.pi_c[0],
      proof.pi_c[1]
    ]

    const transaction = ageCheckContract.connect(accounts[0]).verifyAge(solidityProof, publicSignals)
    console.log("transaction", transaction)
    //    await expect(transaction).to.be.revertedWith("Below Age limit")

    await expect(transaction)
      .to.emit(ageCheckContract, "AgeVerfied")
      .withArgs(await accounts[0].getAddress(), true)
  })
})
