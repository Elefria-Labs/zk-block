cd "$(dirname "$0")"

mkdir -p ../build
mkdir -p ../zkeyFiles
mkdir -p ../contracts

cd ../build

if [ -f ./powersOfTau28_hez_final_14.ptau ]; then
    echo "powersOfTau28_hez_final_14.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_14.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_14.ptau
fi

circom ../circuits/circuit.circom --r1cs --wasm --sym
snarkjs r1cs export json circuit.r1cs circuit.r1cs.json

snarkjs groth16 setup circuit.r1cs powersOfTau28_hez_final_14.ptau circuit_0000.zkey

snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="1st Zk contribution" -v -e="Zk block random entropy"
snarkjs zkey contribute circuit_0001.zkey circuit_0002.zkey --name="2nd Zk contribution" -v -e="web3 Zk block random entropy"
snarkjs zkey beacon circuit_0002.zkey circuit_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

snarkjs zkey export verificationkey circuit_final.zkey verification_key.json
snarkjs zkey export solidityverifier circuit_final.zkey verifier.sol

cp verifier.sol ../contracts/Verifier.sol
cp verification_key.json ../zkeyFiles/verification_key.json
cp circuit_js/circuit.wasm ../zkeyFiles/circuit.wasm
cp circuit_final.zkey ../zkeyFiles/circuit_final.zkey