import { Contract } from "ethers"
import { task, types } from "hardhat/config"

task("deploy:verifier", "Deploy a Verifier contract")
  .addOptionalParam<boolean>("logs", "Print the logs", true, types.boolean)
  .setAction(async ({ logs }, { ethers }): Promise<Contract> => {
    const ContractFactory = await ethers.getContractFactory("MultiSig")
    const [owner] = await ethers.getSigners()
    const contract = await ContractFactory.deploy([owner.address], 1)

    await contract.deployed()

    logs && console.log(`MultiSig contract has been deployed to: ${contract.address}`)

    return contract
  })

// module.exports = async ({ getNamedAccounts, deployments }) => {
//   const { deploy } = deployments;

//   const { deployer } = await getNamedAccounts();
//   const owners = [deployer]; // TODO add more address
//   const numOfApprovals = Math.ceil(1);

//   const multiSig = await deploy("MultiSig", {
//     from: deployer,
//     log: true,
//     args: [owners, numOfApprovals],
//   });
// };
