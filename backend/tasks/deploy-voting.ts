import { Contract } from "ethers"
import { task, types } from "hardhat/config"
import { poseidon_gencontract } from "circomlibjs"

task("deploy:voting", "Deploy the voting contract & its verifier contract")
  .addOptionalParam<boolean>("logs", "Logs ", true, types.boolean)
  .setAction(async ({ logs }, { ethers }): Promise<Contract> => {
    const poseidonContract = {
      abi: poseidon_gencontract.generateABI(2),
      bytecode: poseidon_gencontract.createCode(2)
    }
    const [owner] = await ethers.getSigners()

    const PoseidonLibFactory = new ethers.ContractFactory(poseidonContract.abi, poseidonContract.bytecode, owner)

    const poseidonAddress = await (await (await PoseidonLibFactory.deploy()).deployed()).address
    console.log("poseidonAddress: ", poseidonAddress)

    const Verifier = await ethers.getContractFactory("Verifier")
    const IncrementalLib = await ethers.getContractFactory("IncrementalBinaryTree", {
      libraries: {
        PoseidonT3: poseidonAddress
      }
    })
    const incrementalLibAddress = await (await (await IncrementalLib.deploy()).deployed()).address
    console.log("incrementalLibAddress: ", incrementalLibAddress)

    const ContractFactory = await ethers.getContractFactory("Voting", {
      libraries: {
        IncrementalBinaryTree: incrementalLibAddress
      }
    })

    const verifierAddress = await (await (await Verifier.deploy()).deployed()).address
    console.log("verifierAddress: ", verifierAddress)

    const contract = await ContractFactory.deploy(verifierAddress)
    await contract.deployed()

    logs && console.log(`Voting contract has been deployed to: ${contract.address}`)

    return contract
  })
