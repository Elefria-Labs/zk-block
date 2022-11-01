import { exec as _exec } from "child_process"
import download from "download"
import fs from "fs"
import logger from "js-logger"
import rimraf from "rimraf"
import { zKey, plonk } from "snarkjs"
import { promisify } from "util"
import { config } from "../package.json"

logger.useDefaults()

async function exec(command: string) {
  const { stderr, stdout } = await promisify(_exec)(command)

  if (stderr) {
    throw new Error(stderr)
  }

  logger.info(stdout)
}

async function main() {
  const buildPath = config.paths.build.snark
  const solidityVersion = config.solidity.version

  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath, { recursive: true })
  }

  if (!fs.existsSync(`${buildPath}/powersOfTau28_hez_final_16.ptau`)) {
    const url = "https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_16.ptau"

    await download(url, buildPath)
  }

  await exec(`circom ./circuits/circuit.circom --r1cs --wasm -o ${buildPath}`)

  await plonk.setup(
    `${buildPath}/circuit.r1cs`,
    `${buildPath}/powersOfTau28_hez_final_16.ptau`,
    `${buildPath}/circuit_final_plonk.zkey`,
    logger
  )

  let verifierCode = await zKey.exportSolidityVerifier(
    `${buildPath}/circuit_final_plonk.zkey`,
    { plonk: fs.readFileSync("./node_modules/snarkjs/templates/verifier_plonk.sol.ejs", "utf8") },
    logger
  )
  verifierCode = verifierCode.replace(/pragma solidity \^\d+\.\d+\.\d+/, `pragma solidity ^${solidityVersion}`)

  fs.writeFileSync(`${config.paths.contracts}/PlonkVerifier.sol`, verifierCode, "utf-8")

  const verificationKey = await zKey.exportVerificationKey(`${buildPath}/circuit_final_plonk.zkey`, logger)
  fs.writeFileSync(`${buildPath}/verification_key_plonk.json`, JSON.stringify(verificationKey), "utf-8")

  fs.renameSync(`${buildPath}/circuit_js/circuit.wasm`, `${buildPath}/circuit.wasm`)
  rimraf.sync(`${buildPath}/circuit_js`)
  rimraf.sync(`${buildPath}/powersOfTau28_hez_final_16.ptau`)
  rimraf.sync(`${buildPath}/circuit.r1cs`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
