const ff = require('ffjavascript');
const snarkjs = require('snarkjs');

const generateWitnessJs = require('./witness_calculator.js');

const { unstringifyBigInts } = ff.utils;

const circuitWasm = 'snarks/circuit.wasm';
const zkey = 'snarks/circuit_final.zkey';
const plonkZkey = 'snarks/circuit_final_plonk.zkey';

const getBinaryPromise = (wasmFile: any) =>
  new Promise((resolve, reject) => {
    fetch(wasmFile, { mode: 'no-cors' })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`failed to load wasm binary file at ${circuitWasm}`);
        }
        return response.arrayBuffer();
      })
      .then(resolve)
      .catch(reject);
  });

export async function generateBroadcastParams(
  params: any,
  isPlonk?: boolean,
): Promise<any> {
  // read wasm file as buffer
  // read the wasm generated by compiling the circuit
  const buffer = await getBinaryPromise(circuitWasm);
  // generate witness
  const witnessCalculator = await generateWitnessJs(buffer);
  const buff = await witnessCalculator.calculateWTNSBin(params, 0);

  const provingKey = await fetch(isPlonk ? plonkZkey : zkey);
  const provingKeyBuffer = await provingKey.arrayBuffer();

  if (isPlonk) {
    const { proof, publicSignals } = await snarkjs.plonk.prove(
      new Uint8Array(provingKeyBuffer),
      buff,
      null,
    );

    const editedPublicSignals = unstringifyBigInts(publicSignals);
    const editedProof = unstringifyBigInts(proof);

    const callData = await snarkjs.plonk.exportSolidityCallData(
      editedProof,
      editedPublicSignals,
    );
    return JSON.parse(`[${callData}]`);
  }

  const { proof, publicSignals } = await snarkjs.groth16.prove(
    new Uint8Array(provingKeyBuffer),
    buff,
    null,
  );

  const editedPublicSignals = unstringifyBigInts(publicSignals);
  const editedProof = unstringifyBigInts(proof);

  const callData = await snarkjs.groth16.exportSolidityCallData(
    editedProof,
    editedPublicSignals,
  );

  return JSON.parse(`[${callData}]`);
}

export async function generatePlonkBroadcastParams(
  params: any,
  isPlonk?: boolean,
): Promise<any> {
  // read wasm file as buffer
  // read the wasm generated by compiling the circuit
  const buffer = await getBinaryPromise(circuitWasm);
  // generate witness
  const witnessCalculator = await generateWitnessJs(buffer);
  const buff = await witnessCalculator.calculateWTNSBin(params, 0);

  const provingKey = await fetch(isPlonk ? plonkZkey : zkey);
  const provingKeyBuffer = await provingKey.arrayBuffer();

  const { proof, publicSignals } = await snarkjs.plonk.prove(
    new Uint8Array(provingKeyBuffer),
    buff,
  );

  // TODO update snarkjs library, this is no longer required
  const editedPublicSignals = unstringifyBigInts(publicSignals);

  const callData = await snarkjs.plonk.exportSolidityCallData(
    proof,
    editedPublicSignals,
  );

  // VERY HACKY UPDATE LIB
  return [
    callData.split(',')[0],
    JSON.parse(callData.slice(callData.indexOf(',') + 1)),
  ];
}

export async function generatePlonkBroadcastParams(
  params: any,
  isPlonk?: boolean,
): Promise<any> {
  // read wasm file as buffer
  // read the wasm generated by compiling the circuit
  const buffer = await getBinaryPromise(circuitWasm);
  // generate witness
  const witnessCalculator = await generateWitnessJs(buffer);
  const buff = await witnessCalculator.calculateWTNSBin(params, 0);

  const provingKey = await fetch(isPlonk ? plonkZkey : zkey);
  const provingKeyBuffer = await provingKey.arrayBuffer();

  const { proof, publicSignals } = await snarkjs.plonk.prove(
    new Uint8Array(provingKeyBuffer),
    buff,
  );

  // TODO update snarkjs library, this is no longer required
  const editedPublicSignals = unstringifyBigInts(publicSignals);

  const callData = await snarkjs.plonk.exportSolidityCallData(
    proof,
    editedPublicSignals,
  );

  // VERY HACKY UPDATE LIB
  return [
    callData.split(',')[0],
    JSON.parse(callData.slice(callData.indexOf(',') + 1)),
  ];
}
