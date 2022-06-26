import { utils, Wallet } from "zksync-web3"
import * as ethers from "ethers"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { Deployer } from "@matterlabs/hardhat-zksync-deploy"
import KEYS from "../private.json"

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the Greeter contract`)

  // Initialize the wallet.
  const wallet = new Wallet(`0x${KEYS.privateKey}`)

  // Create deployer object and load the artifact of the contract we want to deploy.
  const deployer = new Deployer(hre, wallet)
  const artifact = await deployer.loadArtifact("Verifier")

  // Deposit some funds to L2 in order to be able to perform L2 transactions.
  //   const depositAmount = ethers.utils.parseEther("0.001")
  //   const depositHandle = await deployer.zkWallet.deposit({
  //     to: deployer.zkWallet.address,
  //     token: utils.ETH_ADDRESS,
  //     amount: depositAmount
  //   })
  // Wait until the deposit is processed on zkSync
  // await depositHandle.wait()

  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.

  const verifierDeployed = await deployer.deploy(artifact, [])
  const ageCheckArtifact = await deployer.loadArtifact("AgeCheck")
  const ageCheck = await deployer.deploy(ageCheckArtifact, [verifierDeployed.address, verifierDeployed.address])

  console.log(`${ageCheckArtifact.contractName} was deployed to ${ageCheck}`)
}
