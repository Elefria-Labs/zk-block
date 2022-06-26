import { Contract } from "ethers"
import { task, types } from "hardhat/config"

task("deploy:ageCheck", "Deploy a AgeCheck & its Verifier contract")
  .addOptionalParam<boolean>("logs", "Logs ", true, types.boolean)
  .setAction(async ({ logs }, { ethers }): Promise<Contract> => {
    const Verifier = await ethers.getContractFactory("Verifier")
    const PlonkVerifier = await ethers.getContractFactory("PlonkVerifier")
    const ContractFactory = await ethers.getContractFactory("AgeCheck")
    // const [owner] = await ethers.getSigners()

    const verifierContract = await Verifier.deploy()
    await verifierContract.deployed()

    const plonkVerifierContract = await PlonkVerifier.deploy()
    await plonkVerifierContract.deployed()

    const contract = await ContractFactory.deploy(verifierContract.address, plonkVerifierContract.address)
    await contract.deployed()

    logs && console.log(`Age Check contract has been deployed to: ${contract.address}`)

    return contract
  })
